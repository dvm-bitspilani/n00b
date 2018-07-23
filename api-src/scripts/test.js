import {genN00b, genSymlink, pullN00b} from './bundle';
import {echo} from 'shelljs';

const testN00b = {
  name: 'chinmay',
  repository: 'https://github.com/ccpandhare/portfolio'
};

genN00b(testN00b);
genSymlink(testN00b,'.');
pullN00b(testN00b, () => echo(12345));
