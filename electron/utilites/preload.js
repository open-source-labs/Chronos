const path = require('path')

const script = document.querySelector('[src=index_bundle.js]');

console.log('from preload', path.resolve(), script);