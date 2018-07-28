import {cd, rm} from 'shelljs';
import isN00b from './isN00b.shell';

module.exports = (N00b, branch) => {
  const dir = (branch.type === 'master') ? 'n00bs' : 'test_n00bs';
  if(isN00b(N00b, branch)) {
    cd(dir);
    rm('-rf', N00b.name);
    cd('../');
  }
};
