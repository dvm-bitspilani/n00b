import {ls} from 'shelljs';

module.exports = target => {
  let dirs = ls('-d','*/');
  dirs = dirs.map(dir => dir.replace('/',''));
  return dirs.filter(name => name === target).length;
};
