import {exec, cd, pwd} from 'shelljs';
import isN00b from './isN00b.shell';

module.exports = (N00b, format) => {
  if(isN00b(N00b)) {
    const cwd = pwd();
    cd(`n00bs/${N00b.name}`);
    const value = exec(`git --no-pager show -s --format='${format}' -n 1`);
    cd(cwd);
    return value;
  }
};
