import {cd, exec} from 'shelljs';

module.exports = (N00b, route, branch) => {
  let dir;
  if(branch === 'master') dir = 'n00bs';
  else dir = 'test_n00bs';
  const cwd = process.cwd();
  const n00bPath = `${cwd}/${dir}/${N00b.name}`;
  cd(route);
  exec(`ln -sf ${n00bPath} ${N00b.www_path}`);
  cd(cwd);
};
