import {cd, exec, echo} from 'shelljs';

module.exports = (N00b, route, branch) => {
  let dir;
  if(branch === 'master') dir = 'n00bs';
  else dir = 'test_n00bs';
  const cwd = process.cwd();
  const n00bPath = `${cwd}/${dir}/${N00b.name}`;
  cd(route);
  echo(process.cwd());
  echo(`ln -sfv ${N00b.www_path} ${n00bPath}`);
  exec(`ln -sfv ${N00b.www_path} ${n00bPath}`);
  cd(cwd);
};
