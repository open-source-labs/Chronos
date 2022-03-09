const fs = require('fs');

const path = require('path');

let route = path.resolve('./resources/app/index.html').replace(/\\/g, '/');
let html = fs.readFileSync(route, 'utf-8');
console.log('hi', html.match(/base/), route);
if (!html.match(/base/)) {
  const entryInd = html.match(/<head>/).index + 6;
  let link = path.resolve() + '/resources/app/extraRouteDepthForImgRoutesToWork/';
  link = link.replace(/\\/g, '/');

  html = html.split('');
  html.splice(entryInd, 0, `<base href="${link}" />`).join('');
  html = html.join('');

  fs.writeFileSync(path.resolve('./resources/app/index.html'), html);
}
