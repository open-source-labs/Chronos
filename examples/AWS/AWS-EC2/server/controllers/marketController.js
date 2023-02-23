const mmdb = require('../models/mmModel');

const marketController = {};

/**
 * @name getMarkets
 * @description selects all markets and loads them into the res.locals.markets array
 */
marketController.getMarkets = (req, res, next) => {
    mmdb.query({
        text: 'select * from markets'
    })
    .then( data => {
        if (data.rowCount > 0) {
            console.log(`Found ${data.rowCount} markets`);
            res.locals.markets = [];
            data.rows.forEach( row => {
                res.locals.markets.push({ id: row.market_id, location: row.location, cardCount: 0 });
            });
        } else {
            console.log("No markets found");        
        }        
        next();
    })
    .catch(err => {
        next(err);
    });
};

/**
 * @name addMarket
 * @description adds a new market to the market table
 */
marketController.addMarket = (req, res, next) => {
    mmdb.query({
        text: 'insert into markets (market_id, location) values ($1, $2)',
        values: [req.body.market_id, req.body.location]
    })
    .then(() => {
        next();
    })
    .catch(err => {
        next(err);
    });
};


module.exports = marketController;

