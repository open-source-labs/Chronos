const PORT = 3000;
const express = require('express');
const path = require('path');

const app = express();
const client = require('./client.js');

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/addBook', (req, res, next) => {
    //generate book entry for gRPC call
    //gRPC addBook function call with parameter of book entry
    //i.e. gRPCAddBook(book entry)
})

app.post('/createOrder', (req, res, next) => {
    //generate order entry for gRPC call
    // call gRPC i.e. gRPCCreateOrder(order entry)
})
//client.createOrder({Name: matt})
app.get('/orders', (req, res, next) => {
  console.log('hello')

    client.getOrders(null, (err, data) => {
            if (err !== null) {
              console.log('err')
              console.log(err)
            }
            console.log(data)
        })
        //request all orders with book info using one function call
        // i.e. gRPC(getAllOrders)
        //take gRPC response and convert into readable format for front-end user
        //i.e gRPC data to JSON
        //res.json(convertedgRPC data)
})

app.listen(PORT, () => console.log('Listening on PORT ' + PORT))