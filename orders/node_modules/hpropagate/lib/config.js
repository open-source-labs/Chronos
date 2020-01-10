const correlationIdHeader = 'x-correlation-id';

const validateHeaderList = headers => {
  if (!Array.isArray(headers)) {
    throw new Error('Header list is not an array');
  }

  // could be tighter - ASCII code between 33 and 126 at the moment
  const headerNameRegex = /^[\x21-\x7e]+$/i;

  const invalidHeaders = headers.filter(h => typeof h !== 'string' || !headerNameRegex.test(h));

  if (invalidHeaders.length > 0) {
    throw new Error(`Header list contains invalid headers: ${invalidHeaders}`);
  }
};

const load = (overrides = {}) => {
  const {
    setAndPropagateCorrelationId = true,
    propagateInResponses = false,
    headersToPropagate = [
      'x-request-id',
      'x-b3-traceid',
      'x-b3-spanid',
      'x-b3-parentspanid',
      'x-b3-sampled',
      'x-b3-flags',
      'x-ot-span-context',
      'x-variant-id'],
  } = overrides;

  validateHeaderList(headersToPropagate);

  const headersToCollect = headersToPropagate;

  let headersToInject = headersToCollect;
  if (setAndPropagateCorrelationId === true) {
    headersToInject = [correlationIdHeader].concat(headersToCollect);
  }

  return {
    setAndPropagateCorrelationId,
    propagateInResponses,
    correlationIdHeader,
    headersToCollect,
    headersToInject,
  };
};

module.exports = {
  load,
};
