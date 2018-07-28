import {cd, exec} from 'shelljs';

module.exports = (N00b, branch, route) => {
  const dir = (branch.type === 'master') ? 'n00bs' : 'test_n00bs';
  const cwd = process.cwd();
  const n00bPath = `${cwd}/${dir}/${N00b.name}`;
  cd(route);
  exec(`ln -sf ${n00bPath} ${N00b.www_path}`);
  cd(cwd);
};
