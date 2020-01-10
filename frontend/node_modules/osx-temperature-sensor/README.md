# osx-temperature-sensor

OSX Temperature Sensor library for [node.js][nodejs-url]

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Git Issues][issues-img]][issues-url]
  [![deps status][daviddm-img]][daviddm-url]
  [![MIT license][license-img]][license-url]

## Quick Start

This small library captures CPU temperature on OSX using [SMC][smc-code-url] - all values are in degree Celsius

### Installation

```bash
$ npm install osx-temperature-sensor --save
```

### Usage

Here a small example how to use this library:

```js
const osxTemp = require('osx-temperature-sensor');

let temperature = osxTemp.cpuTemperature();
console.log('CPU-Information:');
console.log(temperature);
```

## News and Changes

### Latest Activity

- Version 1.0.4: Add compatibility for Node 12 and fix deprecation warnings
- Version 1.0.3: updated issue template
- Version 1.0.2: updated documentation
- Version 1.0.1: updated documentation
- Version 1.0.0: initial release

If you have comments, suggestions & reports, please feel free to contact me!

This library is used by one of my other libraries [systeminformation][systeminformation-github-url], also available via [github][systeminformation-github-url] and [npm][systeminformation-npm-url]


## Reference

### Function Reference

| Function        | Comments |
| --------------- | -------- |
| osxTemp.version() | library version (no callback/promise) |
| osxTemp.cpuTemperature(cb) | CPU temperature (if sensors is installed) in Celsius |
| - main | main temperature |
| - cores | array of temperatures |
| - max | max temperature |

This library is supposed to only work on OSX

## Known Issues

I am happy to discuss any comments and suggestions. Please feel free to contact me if you see any possibility of improvement!

## Comments

If you have ideas or comments, please do not hesitate to contact me.


Happy monitoring!

Sincerely,

Sebastian Hildebrandt, [+innovations](http://www.plus-innovations.com)

## Credits

Written by Sebastian Hildebrandt [sebhildebrandt](https://github.com/sebhildebrandt)

#### Contributers

OSX Temperature: Credits here are going to:

- Massimiliano Marcon [mmarcon](https://github.com/mmarcon) - for his work on [smc-code][smc-code-url]
- Sébastien Lavoie [lavoiesl](https://github.com/lavoiesl) for his work on [osx-cpu-temp][osx-cpu-temp-url] code.
- Yuxin (Ryan) Wang [yxwangcs](https://github.com/yxwangcs) added compatibility for Node 12 and fix deprecation warnings.

## Copyright Information

OS X is a registered trademark of Apple Inc., Node.js is a trademark of Joyent Inc.,
All other trademarks are the property of their respective owners.

## License [![MIT license][license-img]][license-url]

>The [`MIT`][license-url] License (MIT)
>
>Copyright &copy; 2017 Sebastian Hildebrandt, [+innovations](http://www.plus-innovations.com).
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in
>all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>THE SOFTWARE.
>
>Further details see [LICENSE](LICENSE) file.


[npm-image]: https://img.shields.io/npm/v/osx-temperature-sensor.svg?style=flat-square
[npm-url]: https://npmjs.org/package/osx-temperature-sensor
[downloads-image]: https://img.shields.io/npm/dm/osx-temperature-sensor.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/osx-temperature-sensor

[license-url]: https://github.com/sebhildebrandt/osx-temperature-sensor/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[npmjs-license]: https://img.shields.io/npm/l/osx-temperature-sensor.svg?style=flat-square
[changelog-url]: https://github.com/sebhildebrandt/osx-temperature-sensor/blob/master/CHANGELOG.md

[nodejs-url]: https://nodejs.org/en/
[docker-url]: https://www.docker.com/

[daviddm-img]: https://img.shields.io/david/sebhildebrandt/osx-temperature-sensor.svg?style=flat-square
[daviddm-url]: https://david-dm.org/sebhildebrandt/osx-temperature-sensor

[issues-img]: https://img.shields.io/github/issues/sebhildebrandt/osx-temperature-sensor.svg?style=flat-square
[issues-url]: https://github.com/sebhildebrandt/osx-temperature-sensor/issues

[systeminformation-npm-url]: https://npmjs.org/package/systeminformation
[systeminformation-github-url]: https://github.com/sebhildebrandt/systeminformation

[smc-code-url]: https://github.com/mmarcon/node-smc
[osx-cpu-temp-url]: https://github.com/lavoiesl/osx-cpu-temp
