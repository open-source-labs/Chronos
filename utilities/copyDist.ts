/* Use this to prepare packaging the electron app into an executable
tsc compiled the electron "backend" code into the /build folder
webpack compiled the react "frontend" code into the /dist folder
The electron packager will be called such that it will build off
of the /dist folder, so copy the required code into this folder
*/

import * as path from 'path';
import * as fse from 'fs-extra';

console.log('Copying files into the /dist folder prior to electron packaging');

let sourceDir: string;
let destDir: string;

// Copy assets from app/assets into dist
// so that assets load in package build
sourceDir = path.resolve(__dirname, '../app/assets');
destDir = path.resolve(__dirname, '../dist/assets');
if (!fse.existsSync(destDir)) {
  fse.mkdirSync(destDir);
}
fse.copySync(sourceDir, destDir);

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

// Create build 

// Copy React Dev Tools from /dist to /build;
let reactDevToolsSourceDir = path.resolve(__dirname, '../node_modules');
let reactDevToolsDestDir = path.resolve(__dirname, '../build/node_modules');

if (!fse.existsSync(reactDevToolsDestDir)) {
  fse.mkdirSync(reactDevToolsDestDir);
}
fse.ensureDirSync(reactDevToolsDestDir);
fse.copySync(reactDevToolsSourceDir, reactDevToolsDestDir);


// Copy settings.json from root directory into the dist folder
fse.copyFileSync(
  path.resolve(__dirname, '../settings.json'),
  path.resolve(__dirname, '../dist/settings.json')
);

// Copy settings.json from root directory into the build folder
fse.copyFileSync(
  path.resolve(__dirname, '../settings.json'),
  path.resolve(__dirname, '../build/settings.json')
);
