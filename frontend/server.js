// UNCOMMENT THE LINES BELOW
const cmd = require('chronos-microservice-debugger3');
cmd.propagate();

const PORT = 3000;
const express  = require('express');
const cors = require('cors');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const books = 'http://localhost:4545',
      customers = 'http://localhost:5555',
      orders = 'http://localhost:7777';

// UNCOMMENT THE LINE BELOW AND PASS IN YOUR CHOSEN ARGUMENTS
app.use('/', cmd.microCom('Frontend', 'mongo', 'mongodb+srv://benmizel:3A7G4ERMhg%2ER%25wb@cluster0-tllwn.mongodb.net/test?retryWrites=true&w=majority', 'yes', 'm'))

app.use(cors());
app.use('/', express.static('../frontend'));

app.all("/books/*", function(req, res) {
    console.log('redirecting to books');
    apiProxy.web(req, res, {target: books});
});

app.all("/customers/*", function(req, res) {
    console.log('redirecting to customers');
    apiProxy.web(req, res, {target: customers});
});

app.all("/orders/*", function(req, res) {
    console.log('redirecting to orders');
    apiProxy.web(req, res, {target: orders});
});

// Open and listen to server on specified port
app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT} ...`);
});