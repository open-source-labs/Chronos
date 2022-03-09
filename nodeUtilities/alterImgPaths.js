const fs = require('fs');

function alterImgPaths(path, replaceArr) {
    if(fs.existsSync(path) && fs.lstatSync(path).isFile()) {
        
    }
}

alterImgPaths('./dist/index_bundle.js')