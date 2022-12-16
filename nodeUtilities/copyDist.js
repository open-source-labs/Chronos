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
const fs = require('fs-extra');
const path = require('path');

let sourceDir;
let destDir;

// "copyAssetsDist": "echo D | xcopy app\\assets dist\\assets",
sourceDir = path.resolve(__dirname, '../app/assets');
destDir = path.resolve(__dirname, '../dist/assets');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}
fs.copySync(sourceDir, destDir);

// "copyPackageJsonDist": "echo F | xcopy dist.package.json dist\\package.json",
fs.copyFileSync(
  path.resolve(__dirname, '../dist.package.json'),
  path.resolve(__dirname, '../dist/package.json')
);

// "copyBuildDist": "echo D | xcopy build dist\\build",
// "copyBuildDBDist": "echo D | xcopy build\\databases dist\\build\\databases",
// "copyBuildModelsDist": "echo D | xcopy build\\models dist\\build\\models",
// "copyBuildRoutesDist": "echo D | xcopy build\\routes dist\\build\\routes",
// "copyBuildUserDist": "echo D | xcopy build\\user dist\\build\\user",
// "copyBuildUtilitiesDist": "echo D | xcopy build\\utilities dist\\build\\utilities",
sourceDir = path.resolve(__dirname, '../build');
destDir = path.resolve(__dirname, '../dist/build');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}
fs.copySync(sourceDir, destDir);

// "copySettingsDist": "echo F | xcopy settings.json dist\\settings.json"
fs.copyFileSync(
  path.resolve(__dirname, '../settings.json'),
  path.resolve(__dirname, '../dist/settings.json')
);
