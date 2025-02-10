/* Use this to prepare packaging the electron app into an executable
tsc compiled the electron "backend" code into the /build folder
webpack compiled the react "frontend" code into the /dist folder
The electron packager will be called such that it will build off
of the /dist folder, so copy the required code into this folder
*/

// import * as path from 'path';
// import * as fse from 'fs-extra';

// console.log('Copying files into the /dist folder prior to electron packaging');

// let sourceDir: string;
// let destDir: string;

// // Copy assets from app/assets into dist
// // so that assets load in package build
// sourceDir = path.resolve(__dirname, '../app/assets');
// destDir = path.resolve(__dirname, '../dist/assets');
// if (!fse.existsSync(destDir)) {
//   fse.mkdirSync(destDir);
// }
// fse.copySync(sourceDir, destDir);

// // Copy package.json from root directory into webpack's /dist folder
// // so that the necessary node modules can get installed
// fse.copyFileSync(
//   path.resolve(__dirname, '../package.json'),
//   path.resolve(__dirname, '../dist/package.json')
// );

// // Copy tsc'd electron code from /build to webpack's /dist folder
// sourceDir = path.resolve(__dirname, '../build');
// destDir = path.resolve(__dirname, '../dist/build');
// if (!fse.existsSync(destDir)) {
//   fse.mkdirSync(destDir);
// }
// fse.copySync(sourceDir, destDir);

// // Create build 

// // Copy React Dev Tools from /dist to /build;
// let reactDevToolsSourceDir = path.resolve(__dirname, '../node_modules');
// let reactDevToolsDestDir = path.resolve(__dirname, '../build/node_modules');

// if (!fse.existsSync(reactDevToolsDestDir)) {
//   fse.mkdirSync(reactDevToolsDestDir);
// }
// fse.ensureDirSync(reactDevToolsDestDir);
// fse.copySync(reactDevToolsSourceDir, reactDevToolsDestDir);


// // Copy settings.json from root directory into the dist folder
// fse.copyFileSync(
//   path.resolve(__dirname, '../settings.json'),
//   path.resolve(__dirname, '../dist/settings.json')
// );

// // Copy settings.json from root directory into the build folder
// fse.copyFileSync(
//   path.resolve(__dirname, '../settings.json'),
//   path.resolve(__dirname, '../build/settings.json')
// );
import * as path from 'path';
import * as fse from 'fs-extra';
import * as fs from 'fs';

console.log('Copying files into the /dist folder prior to electron packaging');

let sourceDir: string;
let destDir: string;

// 1. Copy assets from app/assets into dist/assets
sourceDir = path.resolve(__dirname, '../app/assets');
destDir = path.resolve(__dirname, '../dist/assets');
if (!fse.existsSync(destDir)) {
  fse.mkdirSync(destDir, { recursive: true });
}
fse.copySync(sourceDir, destDir);

// 2. Copy package.json from root into dist/package.json
fse.copyFileSync(
  path.resolve(__dirname, '../package.json'),
  path.resolve(__dirname, '../dist/package.json')
);

// 3. Copy tsc'd electron code from /build into dist/build
sourceDir = path.resolve(__dirname, '../build');
destDir = path.resolve(__dirname, '../dist/build');
if (!fse.existsSync(destDir)) {
  fse.mkdirSync(destDir, { recursive: true });
}
fse.copySync(sourceDir, destDir);

// 4. Copy node_modules from root/node_modules into build/node_modules
const nodeModulesSourceDir = path.resolve(__dirname, '../node_modules');
const nodeModulesDestDir = path.resolve(__dirname, '../build/node_modules');
if (!fse.existsSync(nodeModulesDestDir)) {
  fse.mkdirSync(nodeModulesDestDir, { recursive: true });
}
fse.ensureDirSync(nodeModulesDestDir);
fse.copySync(nodeModulesSourceDir, nodeModulesDestDir, {
  filter: (src, dest) => {
    const resolvedSrc = path.resolve(src);
    const resolvedDest = path.resolve(dest);
    // Compute the relative path from the node_modules source folder
    const relPath = path.relative(nodeModulesSourceDir, src);
    
    // Debug log the relative path
    console.log(`Copying: ${relPath}`);

    // 1. Skip if the file is a symbolic link (which may cause circular copies)
    try {
      const stats = fs.lstatSync(resolvedSrc);
      if (stats.isSymbolicLink()) {
        console.log(`Skipping symlink: ${relPath}`);
        return false;
      }
    } catch (err) {
      console.error(`Error reading stats for: ${resolvedSrc}`, err);
      return false;
    }
    
    // 2. Skip if the top-level folder of the relative path is "semver"
    const topLevelFolder = relPath.split(path.sep)[0];
    if (topLevelFolder === 'semver') {
      console.log(`Skipping semver folder: ${relPath}`);
      return false;
    }
    
    // 3. Skip if the resolved destination is the same as or inside the resolved source
    if (resolvedDest === resolvedSrc || resolvedDest.startsWith(resolvedSrc + path.sep)) {
      console.log(`Skipping circular copy: ${relPath}`);
      return false;
    }
    
    return true;
  }
});

// 5. Copy settings.json from root into dist/settings.json
fse.copyFileSync(
  path.resolve(__dirname, '../settings.json'),
  path.resolve(__dirname, '../dist/settings.json')
);

// 6. Also copy settings.json into build/settings.json
fse.copyFileSync(
  path.resolve(__dirname, '../settings.json'),
  path.resolve(__dirname, '../build/settings.json')
);
