/* eslint-disable no-param-reassign */
const http = require('http');
const https = require('https');
const uuid = require('uuid');
const tracer = require('./tracer');

const originals = {
  http: {
    createServer: http.createServer,
    request: http.request,
    get: http.get,
  },
  https: {
    createServer: https.createServer,
    request: https.request,
    get: https.get,
  },
};

function setAndCollectCorrelationId(config, req, res) {
  let correlationId = req.headers[config.correlationIdHeader];
  if (typeof correlationId === 'undefined') {
    correlationId = uuid.v4();
  }
  tracer.currentTrace.context.set(config.correlationIdHeader, correlationId);
  res.setHeader(config.correlationIdHeader, correlationId);
}

function collect(req, headers) {
  headers.forEach(header => {
    if (typeof req.headers[header] !== 'undefined') {
      tracer.currentTrace.context.set(header, req.headers[header]);
    }
  });
}

function injectInResponse(response, headers) {
  if (tracer.currentTrace) {
    headers.forEach(header => {
      if (tracer.currentTrace.context.has(header)) {
        // eslint-disable-next-line no-param-reassign
        response.setHeader(header, tracer.currentTrace.context.get(header));
      }
    });
  }
}

function wrappedListener(config, listener) {
  return (req, res, next) => {
    tracer.newTrace('httpRequest');

    if (config.setAndPropagateCorrelationId === true) {
      setAndCollectCorrelationId(config, req, res);
    }

    collect(req, config.headersToCollect);

    if (config.propagateInResponses) {
      injectInResponse(res, config.headersToInject);
    }

    listener(req, res, next);
  };
}

function wrapCreateServer(key, config) {
  // args of http.createServer are ([options<Object>], [listener<Fn>]) Express only sends listener
  return function _wrappedCreateServer(...args) {
    if (args.length === 1) {
      return originals[key].createServer(wrappedListener(config, args[0]));
    }

    return originals[key].createServer(args[0], wrappedListener(config, args[1]));
  };
}

function inject(options, headers) {
  if (tracer.currentTrace) {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = {};
    }

    headers.forEach(header => {
      if (tracer.currentTrace.context.has(header)) {
        // eslint-disable-next-line no-param-reassign
        options.headers[header] = tracer.currentTrace.context.get(header);
      }
    });
  }
}

function wrapRequest(originalMethod, config) {
  function urlFirst(url, options, cb) {
    inject(options, config.headersToInject);

    return originalMethod(url, options, cb);
  }

  function optionsFirst(options, cb) {
    inject(options, config.headersToInject);

    return originalMethod(options, cb);
  }

  return function _wrappedHttpRequest(first, ...rest) {
    if (typeof first === 'string') {
      const [second] = rest;

      if (typeof second === 'function') {
        return urlFirst(first, {}, ...rest);
      }

      return urlFirst(first, ...rest);
    }

    return optionsFirst(first, ...rest);
  };
}

function wrapModule(key, httpModule, config) {
  // args ([options<Object>])
  httpModule.createServer__original = originals[key].createServer;
  httpModule.createServer = wrapCreateServer(key, config);
  httpModule.request__original = originals[key].request;
  httpModule.request = wrapRequest(originals[key].request, config);
  httpModule.get__original = originals[key].get;
  httpModule.get = wrapRequest(originals[key].get, config);
}

function wrapHttps(config) {
  // args ([options<Object>])
  wrapModule('https', https, config);
}

function wrapHttp(config) {
  // args ([options<Object>])
  wrapModule('http', http, config);
}

module.exports = { wrapHttp, wrapHttps };
