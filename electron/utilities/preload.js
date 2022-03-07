const path = require('path')

// const script = document.querySelector('[src=index_bundle.js]');
window.addEventListener('DOMContentLoaded', () => {
  let link = path.resolve() + '/resources/app/';
  link = link.replace(/\\/g, '/');
  var script = document.createElement('script');
  script.src = link + 'index_bundle.js';
  document.getElementsByTagName('head')[0].appendChild(script);
});
