import {cd, exec} from 'shelljs';

module.exports = (N00b, route) => {
  const cwd = process.cwd();
  cd(route);
  exec(`unlink ${N00b.www_path}`);
  cd(cwd);
};
