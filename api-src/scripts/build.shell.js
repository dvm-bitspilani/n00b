import {cd, exec} from 'shelljs';

module.exports = (N00b, branch, callback) => {
  const cwd = process.cwd();
  const n00bPath = (branch.type === 'master') ?
    `${cwd}/n00bs/${N00b.name}` :
    `${cwd}/test_n00bs/${N00b.name}`;
  const {package_manager, script} = N00b.scripts;
  cd(n00bPath);
  exec(`${package_manager} install`, (iCode, iStdout, iStderr) => {
    exec(`${package_manager} ${script}`, (bCode, bStdout, bStderr) => {
      callback({
        install: {
          code: iCode,
          stdout: iStdout,
          stderr: iStderr
        },
        build: {
          code: bCode,
          stdout: bStdout,
          stderr: bStderr
        }
      });
    });
    if(iCode !== 0) {
      callback({
        install: {
          code: iCode,
          stdout: iStdout,
          stderr: iStderr
        }
      });
    }
  });
  cd(cwd);
};
