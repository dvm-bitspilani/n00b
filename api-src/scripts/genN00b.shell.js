import {cd, rm, mkdir, exec} from 'shelljs';
import hasDir from './hasDir.shell';
import isN00b from './isN00b.shell';
import {orgURL} from '../../.n00brc';

module.exports = (N00b, branch) => {
  const dir = (branch.type === 'master') ? 'n00bs' : 'test_n00bs';
  if(isN00b(N00b, branch)) {
    cd(dir);
    rm('-rf', N00b.name);
    cd('../');
  }
  if(hasDir(dir)) {
    cd(dir);
    mkdir(N00b.name);
    cd(N00b.name);
    exec(`git init;
          git remote add origin ${orgURL}/${N00b.repository}`);
    cd('../../');
  }
};
