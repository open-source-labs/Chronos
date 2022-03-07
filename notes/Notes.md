dist folder contains the client side code

build folder contains the electron code

electron-packager ./dist chronos --overwrite --asar --prune=true --out=release-builds

electron-packager ./dist chronos --overwrite --prune=true --out=release-builds


