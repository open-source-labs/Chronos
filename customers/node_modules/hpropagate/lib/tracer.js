const asyncHooks = require('async_hooks');
const uuid = require('uuid');

const prevStates = {};

const tracer = {
  traces: {},
};

function init(asyncId, type, triggerAsyncId) {
  if (tracer.traces[triggerAsyncId]) {
    tracer.traces[asyncId] = tracer.traces[triggerAsyncId];
  }
}

function before(asyncId) {
  if (!tracer.traces[asyncId]) {
    return;
  }
  prevStates[asyncId] = tracer.currentTrace;
  tracer.currentTrace = tracer.traces[asyncId];
}

function after(asyncId) {
  if (!tracer.traces[asyncId]) {
    return;
  }
  tracer.currentTrace = prevStates[asyncId];
}

function destroy(asyncId) {
  if (tracer.traces[asyncId]) {
    delete tracer.traces[asyncId];
    delete prevStates[asyncId];
  }
}

const hook = asyncHooks.createHook({
  init, before, after, destroy,
});

class Trace {
  constructor(type) {
    this.id = uuid.v1();
    this.type = type;
    this.context = new Map();
  }
}

tracer.newTrace = type => {
  tracer.currentTrace = new Trace(type);
  tracer.traces[asyncHooks.executionAsyncId()] = tracer.currentTrace;
  return tracer.currentTrace;
};

tracer.enable = () => hook.enable();

module.exports = tracer;
