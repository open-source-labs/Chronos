import * as path from 'path';
import * as fse from 'fs-extra';

// Delete the existing dist folder
console.log('Deleting contents of /dist...');
fse.emptyDirSync(path.resolve(__dirname, '../dist'));