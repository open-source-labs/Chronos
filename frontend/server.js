const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;


app.use('/', express.static(path.resolve(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname), '../frontend/index.html');
});

app.listen(PORT, () => console.log('Server is listening on port', PORT));
