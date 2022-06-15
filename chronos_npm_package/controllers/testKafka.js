const chronos = require('../chronos');
require('../chronos-config');

chronos.track();
console.log('starting chronos.kafka');
chronos.kafka();
