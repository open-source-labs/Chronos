const path = require('path');
const express = require('express');

const PORT = 5000;

const chronosConfig = require('./chronos-config');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
chronos.propagate();

const app = express();

const trackingMiddleware = chronos.track();
app.use(trackingMiddleware);

app.use('/assets', express.static(path.resolve(__dirname, './assets')));

app.use('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Something went wrong' });
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`Client server listening on port ${PORT}`);
  });
};

start();
