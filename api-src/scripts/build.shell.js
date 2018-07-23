import {cd, exec} from 'shelljs';

module.exports = (N00b, callback) => {
  const cwd = process.cwd();
  const n00bPath = `${cwd}/n00bs/${N00b.name}`;
  cd(n00bPath);
  exec('yarn build', (code, stdout, stderr) => {
    callback({
      code: code,
      stdout: stdout,
      stderr: stderr
    });
  });
  cd(cwd);
};
