const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const marketController = require('./controllers/marketController');
const cardController = require('./controllers/cardController');

const app = express();
/////////chronos implementation if installing chronos as npm package
const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
chronos.propagate();
app.use('/', chronos.track());
/////////

const PORT = process.env.PORT || '3000';

app.use(logger(':date[clf] :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist/')));
app.use((req, res, next) => { console.log(req.body); next(); });


app.get('/api/getMarkets',
    marketController.getMarkets,
    cardController.getAllCards,
    (req, res) => {
      res.status(200).json(res.locals.markets);
    }
);

app.post('/api/addMarket',
   marketController.addMarket,
    (req, res) => {
        res.sendStatus(200);
    }
);

app.post('/api/addCard',
   cardController.addCard,
    (req, res) => {
        res.sendStatus(200);
    }
);

app.post('/api/deleteCard',
   cardController.deleteCard,
    (req, res) => {
        res.sendStatus(200);
    }
);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    console.error(err);
    res.status(err.status || 500).send(res.locals.message);
  });



app.listen(PORT, (err) => {
  console.log(new Date(), err || 'server listening on port '  + PORT);
});

module.exports = app;