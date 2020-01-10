const config = require('./lib/config');
const tracer = require('./lib/tracer');
const httpWrapper = require('./lib/http_wrapper');

module.exports = overrides => {
  const configuration = config.load(overrides);
  httpWrapper.wrapHttp(configuration);
  httpWrapper.wrapHttps(configuration);

  tracer.enable();
};
