![Chronos logo](https://raw.githubusercontent.com/Chronos2-0/Chronos/master/app/assets/logo2.png)

Microservice communication and health visualizer.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

```js
const cmd = require('chronos-microservice-debugger3')
cmd.propagate()

app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install chronos-microservice-debugger3
```

## Features

  * HTTP request tracing
  * Speed and latency tracking
  * Process monitoring
  * Memory usage

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

## People

[List of all contributors](https://github.com/Chronos2-0/Chronos/graphs/contributors)

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/chronos-microservice-debugger3.svg
[npm-url]: https://www.npmjs.com/package/chronos-microservice-debugger3
[downloads-image]: https://img.shields.io/npm/dm/chronos-microservice-debugger3.svg
[downloads-url]: https://npmjs.org/package/chronos-microservice-debugger3

## How can I use Chronos?
1. Go to https://www.npmjs.com/package/chronos-microservice-debugger and follow the instructions to install the NPM package within each microservice of your application
2. Download this repo
3. Inside the downloaded directory, run `npm install` followed by `npm start`
