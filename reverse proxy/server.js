// UNCOMMENT THE LINES BELOW
// const cmd = require('chronos-microservice-debugger3');
// cmd.propagate();

const PORT = 3000;
const express = require('express');
const cors = require('cors');

const app = express();
const httpProxy = require('http-proxy');

const apiProxy = httpProxy.createProxyServer();
const books = 'http://localhost:4545';
const customers = 'http://localhost:5555';
const orders = 'http://localhost:7777';

// UNCOMMENT THE LINE BELOW AND PASS IN YOUR CHOSEN ARGUMENTS
// app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))

app.use(cors());
app.use('/', express.static('../reverse\ proxy/'));

app.all('/books/*', (req, res) => {
  console.log('redirecting to books');
  apiProxy.web(req, res, { target: books });
});

app.all('/customers/*', (req, res) => {
  console.log('redirecting to customers');
  apiProxy.web(req, res, { target: customers });
});

app.all('/orders/*', (req, res) => {
  console.log('redirecting to orders');
  apiProxy.web(req, res, { target: orders });
});

// Open and listen to server on specified port
app.listen(PORT, () => {
  console.log(`Reverse Proxy server running on port ${PORT} ...`);
});
