import mongoose, {Schema} from 'mongoose';
import {
  genSymlink,
  genN00b,
  pullN00b,
  getCommitDetails,
  build,
  unlinkN00b,
  removeN00b
} from '../scripts/bundle';
import {domainMap} from '../../.n00brc';

const domains = ['oops'];
for (let domain in domainMap) {
  domains.push(domain);
}

const N00bSchema = new Schema({
  'domain': {
    type: String,
    enum: domains,
    required: [true, 'I SHOULD HAS "domain"']
  },
  'www_path': {
    type: String,
    required: [true, 'I SHOULD HAS "www_path"'],
    validate: /^[a-z0-9_]+$/
  },
  'name': {
    type: String,
    required: [true, 'I SHOULD HAS "name"'],
    unique: true,
    validate: /^[a-z0-9_]+$/
  },
  'repository': {
    type: String,
    required: [true, 'I SHOULD HAS "repository"']
  },
  'branches': {
    type: Array,
    default: [
      {
        type: 'master',
        name: 'master'
      }
    ]
  },
  'scripts': {
    enabled: {
      type: Boolean,
      default: false
    },
    package_manager: {
      type: String,
      values: ['yarn','npm'],
      default: 'yarn'
    },
    script: {
      type: String,
      default: 'build'
    }
  },
  'created_at': {
    type: Date,
    default: Date.now
  },
  'last_pull': {
    'master': {
      'time': Date,
      'commit': {
        'author': String,
        'message': String,
        'time': String,
        'hash': String
      },
      build_result: {},
      pull_result: {}
    },
    'test': {
      'time': Date,
      'commit': {
        'author': String,
        'message': String,
        'time': String,
        'hash': String
      },
      build_result: {},
      pull_result: {}
    }
  }
});

N00bSchema.methods.genSymlink = function() {
  this.branches.forEach(branch => {
    const linkDir = domainMap[this.domain][branch.type];
    genSymlink(this, branch, linkDir);
  });
};

N00bSchema.methods.genN00b = function() {
  this.branches.forEach(branch => {
    genN00b(this, branch);
  });
};

N00bSchema.methods.removeN00b = function() {
  return new Promise(resolve => {
    let removed = this.branches.map(
      branch => new Promise(_resolve => {
        const linkDir = domainMap[this.domain][branch.type];
        removeN00b(this, branch);
        unlinkN00b(this, linkDir);
        _resolve();
      })
    );
    Promise.all(removed).then(resolve);
  });
};

N00bSchema.methods.pull = function() {
  return new Promise((resolve, reject) => {
    let results = this.branches.map(branch => {
      return new Promise((_resolve, _reject) => {
        pullN00b(this, branch, pull_result => {
          // TODO: For some reason, multiple gCDs don't work.
          // Get that working...
          const details = getCommitDetails(this, branch, '%an^^^%B^^^%cr^^^%H');
          const detailsArray  = details.replace(/\n/g,'').split('^^^');
          this.last_pull[branch.type] = {
            time: Date.now(),
            commit: {
              author: detailsArray[0],
              message: detailsArray[1],
              time: detailsArray[2],
              hash: detailsArray[3]
            },
            pull_result: pull_result
          };
          this.buildBranch(branch).then(_resolve).catch(_reject);
        });
      });
    });
    Promise.all(results).then(resolve).catch(reject);
  });
};

N00bSchema.methods.buildBranch = function(branch) {
  return new Promise((resolve, reject) => {
    if(this.scripts.enabled) {
      build(this, branch, result => {
        this.last_pull[branch.type].build_result = result;
        this.save(err => {
          if(err) reject({
            error: err,
            error_src: 'build.build'
          });
          else resolve();
        });
      });
    } else {
      this.save(err => {
        if(err) reject({
          error: err,
          error_src: 'build.save'
        });
        else resolve();
      });
    }
  });
};

N00bSchema.methods.build = function() {
  return new Promise((resolve, reject) => {
    const builds = this.branches.map(branch => this.buildBranch(branch));
    Promise.all(builds).then(resolve).catch(reject);
  });
};

module.exports = mongoose.model('N00b', N00bSchema);
