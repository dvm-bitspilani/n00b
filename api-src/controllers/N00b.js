import mongoose from 'mongoose';
import {orgName, webhookURL} from '../../.n00brc';
import github from '../github';

const N00b = mongoose.model('N00b');

const list_all_n00bs = (req, res) => {

  N00b.find({}, (err, n00bs) => {
    if(err) res.json({
      okay: false,
      error: err,
      error_src: 'list_all_n00bs.find'
    });
    n00bs = n00bs.map(async _n00b => {
      let webhook, commit;
      let webhookData, commitData;

      // Get last commit data from GitHub
      try {
        commit = await github.repos.getCommits({
          owner: orgName,
          repo: _n00b.repository,
          per_page: 1
        });
        commitData = {
          okay: true,
          author: commit.data[0].commit.author.name,
          message: commit.data[0].commit.message,
          time: commit.data[0].commit.author.date,
          hash: commit.data[0].sha,
        };
      } catch(err) {
        commitData = {
          okay: false,
          err: err,
        };
      }

      // Get WebHook data from GitHub
      try {
        webhook = await github.repos.getHook({
          owner: orgName,
          repo: _n00b.repository,
          hook_id: _n00b.webhook_id
        });
        webhookData = {
          last_response: webhook.data.last_response,
          url: webhook.data.config.url,
          n00b_valid: webhook.data.config.url === webhookURL
        };
      } catch(err) {
        webhookData = {
          okay: false,
          error: err
        };
      }

      return {
        n00b: _n00b,
        github: {
          last_commit: commitData,
          webhook: webhookData
        }
      };
    });

    Promise.all(n00bs).then(result => {
      res.json({
        okay: true,
        data: result
      });
    }).catch(err => {
      res.json({
        okay: false,
        error: err,
        error_src: 'list_all_n00bs.github',
        data: n00bs
      });
    });

  });

};

const create_new_n00b = (req, res) => {
  let newN00b = new N00b({
    ...req.body,
    repository: req.body.repository || 'oops'
  });
  try {
    newN00b.genN00b();
    newN00b.genSymlink();
    newN00b.pull().then(() => {
      newN00b.genWebhook().then(() => {
        newN00b.save((err,n00b) => {
          if(err) {
            res.json({
              okay: false,
              error: err,
              error_src: 'create_new_n00b.save'
            });
          } else {
            res.json({
              okay: true,
              _id: n00b._id
            });
          }
        });
      }).catch(err => {
        res.json({
          okay: false,
          error: err,
          error_src: 'create_new_n00b.genWebhook'
        });
      });
    }).catch(err => {
      res.json({
        okay: false,
        error: err,
        error_src: 'create_new_n00b.pull'
      });
    });
  } catch (err) {
    res.json({
      okay: false,
      error: err,
      error_src: 'create_new_n00b.shell'
    });
  }
};

const kill_n00b = (req, res) => {
  if(req.body._id) {
    N00b.remove({_id: req.body._id}, (err, n00b) => {
      if(err || !n00b) {
        res.json({
          okay: false,
          error: {
            ...err,
            n: n00b
          },
          error_src: 'kill_n00b.remove'
        });
      } else {
        res.json({
          okay: true
        });
      }
    });
  } else {
    res.json({
      okay: false,
      error: {
        message: 'No ID specified'
      },
      error_src: 'kill_n00b.no_id'
    });
  }
};

const pull_n00b = (req, res) => {
  if(req.body._id) {
    N00b.find({_id: req.body._id}, (err, n00b) => {
      if(err || !n00b) {
        res.json({
          okay: false,
          error: {
            ...err,
            n: n00b
          },
          error_src: 'pull_n00b.find'
        });
      } else {
        n00b.pull().then(() => {
          res.json({
            okay: true,
            last_pull: n00b.last_pull
          });
        }).catch(err => {
          res.json({
            okay: false,
            error: err,
            error_src: 'pull_n00b.pull'
          });
        });
      }
    });
  } else {
    res.json({
      okay: false,
      error: {
        message: 'No ID specified'
      },
      error_src: 'pull_n00b.no_id'
    });
  }
};

const gen_webhook = (req, res) => {
  if(req.body._id) {
    N00b.findOne({_id: req.body._id}, (err, n00b) => {
      if(err || !n00b) {
        res.json({
          okay: false,
          error: {
            ...err,
            n: n00b
          },
          error_src: 'gen_webhook.find'
        });
      } else {
        n00b.genWebhook(req.body.webhook_id).then(() => {
          res.json({
            okay: true,
            webhook_id: n00b.webhook_id
          });
        }).catch(err => {
          res.json({
            okay: false,
            error: err,
            error_src: 'gen_webhook.genWebhook'
          });
        });
      }
    });
  } else {
    res.json({
      okay: false,
      error: {
        message: 'No ID specified'
      },
      error_src: 'gen_webhook.no_id'
    });
  }
};

const test_webhook = (req, res) => {
  if(req.params._id) {
    N00b.findOne({_id: req.params._id}, (err, n00b) => {
      if(err || !n00b) {
        res.json({
          okay: false,
          error: {
            ...err,
            n: n00b
          },
          error_src: 'test_webhook.find'
        });
      } else {
        github.repos.testHook({
          owner: orgName,
          repo: n00b.repository,
          hook_id: n00b.webhook_id
        }).then(() => {
          res.json({
            okay: true
          });
        }).catch(err => {
          res.json({
            okay: false,
            error: err,
            error_src: 'test_webhook.pull'
          });
        });
      }
    });
  } else {
    res.json({
      okay: false,
      error: {
        message: 'No ID specified'
      },
      error_src: 'test_webhook.no_id'
    });
  }
};

module.exports = {
  list_all_n00bs: list_all_n00bs,
  create_new_n00b: create_new_n00b,
  kill_n00b: kill_n00b,
  pull_n00b: pull_n00b,
  gen_webhook: gen_webhook,
  test_webhook: test_webhook
};
