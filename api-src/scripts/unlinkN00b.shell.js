import {exec} from 'shelljs';
import isN00b from './isN00b.shell';

module.exports = (N00b,route) => {
  if(isN00b(N00b)) {
    exec(`unlink ${route}/${N00b.name}`);
  }
};
