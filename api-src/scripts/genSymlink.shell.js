import {cd, ln} from 'shelljs';

module.exports = (N00b, route, branch) => {
  let dir;
  if(branch === 'master') dir = 'n00bs';
  else dir = 'test_n00bs';
  const link = N00b.www_path;
  const cwd = process.cwd();
  const n00bPath = `${cwd}/${dir}/${N00b.name}`;
  cd(route);
  ln('-sf', n00bPath, link);
  cd(cwd);
};
