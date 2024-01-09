const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '/../../.env') });

const PORT = 5000;

const app = express();

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
