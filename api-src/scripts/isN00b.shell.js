import {cd} from 'shelljs';
import hasDir from './hasDir.shell';

module.exports = (N00b, branch) => {
  let dir;
  if(branch === 'master') dir = 'n00bs';
  else dir = 'test_n00bs';
  if(hasDir(dir)) {
    cd(dir);
    if(hasDir(N00b.name)) {
      cd('../');
      return true;
    }
    cd('../');
  }
  return false;
};
