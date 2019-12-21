const cmd = require('chronos-microservice-debugger2');
cmd.propagate();
const express = require('express');
const path = require('path');

const PORT = 5555;
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const controller = require('./CustomerController');
//  const path = require('path');

app.use('/', cmd.microCom('customers_microservice', 'sql', 'postgres://kpbljbrv:Ry1hO5KPIU-jvVyGnHHne-yplDr2Yk3H@rajje.db.elephantsql.com:5432/kpbljbrv'));
cmd.microHealth('customers_microservice', 'sql', 'postgres://kpbljbrv:Ry1hO5KPIU-jvVyGnHHne-yplDr2Yk3H@rajje.db.elephantsql.com:5432/kpbljbrv', 's');

app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));

// eslint-disable-next-line max-len
//  ********** I PROBABLY STILL NEED THIS PART FOR CHRONOS TO WORK AND DEBUG MY MICOSERVICE *************
// const mw = require('../mwMongo.js');
//  app.use('/', mw.microCom(path.basename(__filename)));
// mw.microHealth(path.resolve(__filename));


// const mw = require("../mwSQL.js")
// app.use('/', mw.microCom('customers'))
// mw.microHealth('customers');


//  ********** END **********


// Create a new customer
app.post('/createcustomer', controller.createcustomer, (req, res) => {
  res.status(200).json(res.locals.createcustomer);
});

// List all customers
app.get('/getcustomers', controller.getcustomers, (req, res) => {
  res.status(200).json(res.locals.getcustomers);
});

//  Delete a customer with id
app.delete('/deletecustomer:id?', controller.deletecustomer, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// Get books information from the books application
app.get('/getbooksinfo', controller.getbooksinfo, (req, res) => {
  //  console.log(`These are the books I got back ${JSON.stringify(res.locals.booksinfo)}`);
  res.status(200).json(res.locals.booksinfo);
});


app.listen(PORT, () => {
  console.log(`Customer server running on port ${PORT}...`);
});

// ******** I DONT THINK THIS PART IS NECESSARY. I'LL JUST LEAVE A COMMENT HERE IT HAS BEEN REFACTORED ABOVE**********

// Get customer by using their id
// app.get('/customer/:id', (req, res, next) => {
//   Customer.findById(req.params.id)
//     .then((customer) => {
//       if (customer) {
//         res.json(customer);
//         next();
//       } else {
//         Promise.reject(err);
//       }
//     });
// });

// ********* END ********

// Delete a customer by their id
// app.delete('/customer/:id', (req, res, next) => {
//   Customer.findOneAndRemove(req.params.id)
//     .then(() => {
//       res.send('Customer successfully deleted');
//       next();
//     }).catch((err) => {
//       if (err) {
//         throw err;
//       }
//     });
// });
