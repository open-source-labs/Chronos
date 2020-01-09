[![NPM](https://nodei.co/npm/hpropagate.png?compact=true)](https://nodei.co/npm/hpropagate/)

# hpropagate [![CircleCI](https://circleci.com/gh/WealthWizardsEngineering/hpropagate.svg?style=svg)](https://circleci.com/gh/WealthWizardsEngineering/hpropagate)

This package automatically propagates HTTP headers from inbound to outbound HTTP requests.

## The why

We use a micro-service architecture with a growing number of HTTP endpoints. We want to propagate certain HTTP headers received from the incoming HTTP requests to all subsequent outbound HTTP requests without the need for our engineers to do it programmatically in each services:

By default, the following headers are automatically propagated:

1. `x-correlation-id`. If the header is missing from the inbound request, it will be created with a UUID as value.
2. `x-variant-id` to allow us to deploy multiple versions of the same services at the same time.
3. `x-request-id` for tracing
4. `x-b3-traceid` for tracing
5. `x-b3-spanid` for tracing
6. `x-b3-parentspanid` for tracing
7. `x-b3-sampled` for tracing
8. `x-b3-flags` for tracing
9. `x-ot-span-context` for tracing

Apart from `x-correlation-id`, only headers received on the incoming request will be propagated to outbound calls.

The list of headers can be overriden and the initialisation of `x-correlation-id` disabled, see [below](#override-defaults)

## Getting started

To use the default configuration:

```javascript
// should have this line as early as possible in your code
// it must be before loading express and request
const hpropagate = require('hpropagate');

// then start it
hpropagate();
```

Or do it in one go:

```javascript
require('hpropagate')();
```

## Override Defaults

- to disable the initialisation and generation of the correlation id header:

```javascript
hpropagate({
    setAndPropagateCorrelationId: false
});
```

- to override the list of headers to propagate:

```javascript
hpropagate({
    headersToPropagate: [
        'x-my-header',
        'x-another-header'
    ]
});
```

You can also combine those, for example to disable the initialisation of the correlation id and only propagate it:

```javascript
hpropagate({
    setAndPropagateCorrelationId: false,
    headersToPropagate: [
        'x-correlation-id'
    ]
});
```
- to enable the propagation of the headers in the response (to allow more traceability):

```javascript
hpropagate({
    propagateInResponses: true
});
```

## The How

Inspiration from this [talk](https://youtu.be/A2CqsR_1wyc?t=5h26m40s) ([Slides and Code](https://github.com/watson/talks/tree/master/2016/06%20NodeConf%20Oslo)) and this [module](https://github.com/guyguyon/node-request-context)

The first goal is to be able to propagate certain headers (i.e. `X-Correlation-ID`) to outbound HTTP requests without the need to do it programmatically in the service.

It works by using a global `tracer` object which keeps a records of traces (a `trace` object per http request). The header value is saved in the `trace` object associated with the current request. 
The http core code is wrapped to record headers on the `trace` (on the request listener of the http server set with `http.createServer`) and inject headers to the outbound requests (currently only on `http.request`).

Node's `async_hooks` module (new in Node 8) is used to set/reset `tracer.currentTrace` to the trace relevant to the current execution context. `tracer.currentTrace` is used in the wrapped functions to record/access the headers data.

## Limitations

- Only tested with `Express 4`
- Need Node >= 8
- Many more....
