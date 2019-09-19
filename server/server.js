const express = require('express');
const path = require('path');
const state = require('../user/settings');

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.get('/state', (req, res) => {
  console.log(res);
  res.send('hello?')
});

app.listen(34343, () => {
  console.log('Server listening on Port 34343!');
});
