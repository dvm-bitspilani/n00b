import {exec, cd, pwd} from 'shelljs';
import isN00b from './isN00b.shell';

module.exports = (N00b, branch, callback = () => {}) => {
  const dir = (branch.type === 'master') ? 'n00bs' : 'test_n00bs';
  const cwd = pwd();
  if(isN00b(N00b, branch)) {
    cd(`${cwd}/${dir}/${N00b.name}`);
    exec(`git pull origin ${branch.name}`, (code, stdout, stderr) => {
      callback({
        code: code,
        stdout: stdout,
        stderr: stderr
      });
    });
    cd('../../');
  }
};
