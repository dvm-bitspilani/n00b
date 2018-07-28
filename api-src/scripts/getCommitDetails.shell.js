import {exec, cd, pwd} from 'shelljs';
import isN00b from './isN00b.shell';

module.exports = (N00b, branch, format) => {
  if(isN00b(N00b, branch)) {
    const dir = (branch.type === 'master') ? 'n00bs' : 'test_n00bs';
    const cwd = pwd();
    cd(`${cwd}/${dir}/${N00b.name}`);
    const value = exec(`git --no-pager show -s --format='${format}' -n 1`);
    cd(cwd);
    return value;
  }
};
