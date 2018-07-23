import mongoose from 'mongoose';
import sha1 from 'sha1';
import {orgName, APISecret} from '../../.n00brc';
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
      let commit, commitData;
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

      return {
        n00b: _n00b,
        github: {
          last_commit: commitData
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
    N00b.removeOne({_id: req.body._id}, (err, n00b) => {
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
    N00b.findOne({_id: req.body._id}, (err, n00b) => {
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

const webhook = (req, res) => {
  const signature = req.headers['X-Hub-Signature'];
  const sha = 'sha1=' + sha1(APISecret);
  const repository = req.body.repository.name;
  if(signature === sha) {
    N00b.findOne({repository: repository}, (err, n00b) => {
      if(err || !n00b) {
        res.json({
          okay: false,
          error: err,
          error_src: 'webhook.findOne'
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
            error_src: 'webhook.pull'
          });
        });
      }
    });
    res.json({
      okay: true
    });
  } else {
    res.json({
      okay: false,
      error: {
        message: 'Could not verify identity'
      },
      error_src: 'webhook.insecure'
    });
  }
};

module.exports = {
  list_all_n00bs: list_all_n00bs,
  create_new_n00b: create_new_n00b,
  kill_n00b: kill_n00b,
  pull_n00b: pull_n00b,
  webhook: webhook
};
