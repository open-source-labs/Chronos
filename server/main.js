const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// console.log('CURRENT PATH', path.resolve(__dirname, '../client/assets'));

//serve static files 
// app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')))

//serve main page
// app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')))

//invoke server and log port
app.listen(port, () => console.log(`This app is listening on port ${port}!`));