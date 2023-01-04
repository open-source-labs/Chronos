// THIS IS THE OLD BUILD CODE IN THE PACKAGE.JSON:
/* "prepareDist": "npm run deleteDist && tsc -v && tsc -p . && npm run build && 
npm run copyAssetsDist && 
npm run copyPackageJsonDist && 
npm run copyBuildDist && 
npm run copyBuildDBDist && 
npm run copyBuildModelsDist && 
npm run copyBuildRoutesDist && 
npm run copyBuildUtilitiesDist && 
npm run copySettingsDist && 
npm run installDep",
*/


/* Use this to prepare packaging the electron app into an executable
tsc compiled the electron "backend" code into the /build folder
webpack compiled the react "frontend" code into the /dist folder
The electron packager will be called such that it will build off
of the /dist folder, so copy the required code into this folder
*/

const fse = require('fs-extra');
const path = require('path');

console.log('Copying files into the /dist folder prior to electron packaging')

let sourceDir;
let destDir;

// "copyAssetsDist": "echo D | xcopy app\\assets dist\\assets",
// sourceDir = path.resolve(__dirname, '../app/assets');
// destDir = path.resolve(__dirname, '../dist/assets');
// if (!fse.existsSync(destDir)) {
//   fse.mkdirSync(destDir);
// }
// fse.copySync(sourceDir, destDir);

// Copy package.json from root directory into webpack's /dist folder
// so that the necessary node modules can get installed
fse.copyFileSync(
  path.resolve(__dirname, '../package.json'),
  path.resolve(__dirname, '../dist/package.json')
);

// Copy tsc'd electron code from /build to webpack's /dist folder
sourceDir = path.resolve(__dirname, '../build');
destDir = path.resolve(__dirname, '../dist/build');
if (!fse.existsSync(destDir)) {
  fse.mkdirSync(destDir);
}
fse.copySync(sourceDir, destDir);

// Copy settings.json from root directory into the dist folder
fse.copyFileSync(
  path.resolve(__dirname, '../settings.json'),
  path.resolve(__dirname, '../dist/settings.json')
);
