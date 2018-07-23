import {exec, cd} from 'shelljs';
import isN00b from './isN00b.shell';

module.exports = (N00b, branch, callback = () => {}) => {
  if(isN00b(N00b)) {
    if(branch == 'master')
      cd(`n00bs/${N00b.name}`);
    else
      cd(`test_n00bs/${N00b.name}`);
    exec(`git pull origin ${branch}`, (code, stdout, stderr) => {
      callback({
        code: code,
        atdout: stdout,
        stderr: stderr
      });
    });
    cd('../../');
  }
};
