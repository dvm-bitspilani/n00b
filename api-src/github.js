import {APIToken} from '../.n00brc';

const github = require('@octokit/rest')();
github.authenticate({
  type: 'oauth',
  token: APIToken
});

module.exports = github;
