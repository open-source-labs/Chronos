// const express = require('express');
const path = require('path');

// const app = express();

// const PORT = 3000;


// app.listen(PORT, () => console.log('Server is listening on port', PORT));


// const cmd = require('chronos-microservice-debugger3');

// cmd.propagate();

const PORT = 3000;
const express = require('express');
const cors = require('cors');

const app = express();


app.use('/', express.static(path.resolve(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname), '../frontend/index.html');
});
const httpProxy = require('http-proxy');

const apiProxy = httpProxy.createProxyServer();
const books = 'http://localhost:4545';
const customers = 'http://localhost:5555';
const orders = 'http://localhost:7777';

// UNCOMMENT THE LINE BELOW AND PASS IN YOUR CHOSEN ARGUMENTS
// eslint-disable-next-line max-len
// app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))
// app.use('/', cmd.microCom('frontend', 'mongo', 'mongodb+srv://chronos:jenae@cluster0-gw2vt.mongodb.net/test?retryWrites=true&w=majority', 'yes', 'm'));

app.use(cors());

// CHAOS FLOW - SIMPLY A TEST FOR THE EXPESS SERVER
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- METHOD:${req.method}, PATH: ${
  req.url
}, BODY: ${JSON.stringify(req.body)}, ID: ${req.query.id}
    ***************************************************************************************`,
  );
  next();
});
// app.use('/', express.static('/usr/src/app/frontend'));

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
  console.log(`Frontend server running on port ${PORT} ...`);
});
