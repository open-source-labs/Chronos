const path = require('path');
const fse = require('fs-extra');

// Delete the existing dist folder
console.log('Deleting contents of /dist...');
fse.emptyDirSync(path.resolve(__dirname, '../dist'));