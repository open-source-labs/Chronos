const mmdb = require('../models/mmModel');

const cardController = {};

/**
 * @name getAllCards
 * @description queries cards table in db and aggregates cards per market
 */
cardController.getAllCards = (req, res, next) => {
    mmdb.query({
        text: 'select market_id, count(*) as card_count from cards group by market_id'
    })
    .then( data => {
        if( data.rowCount > 0 ) {
            data.rows.forEach( row => {
                for (let i = 0; i < res.locals.markets.length; i++) {
                    if (res.locals.markets[i].id === row.market_id) {
                        res.locals.markets[i].cardCount = row.card_count;
                        break;
                    }
                }
            });
        } else {
            console.log("No cards found");
        }        
        next();
    })
    .catch(err => {
        next(err);
    });
};

/**
 * @name addCard
 * @description adds a new card to the specified market in the cards table
 */
cardController.addCard = (req, res, next) => {
    mmdb.query({
        text: 'insert into cards (market_id) values ($1)',
        values: [req.body.market_id]
    })
    .then(() => {
        next();
    })
    .catch(err => {
        next(err);
    });
};

/**
 * @name deleteCard
 * @description deletes the most recently added card from specified market in the cards table
 */
cardController.deleteCard = (req, res, next) => {
    mmdb.query({
        text: 'delete from cards where _id = (select max(_id) from cards where market_id = $1)',
        values: [req.body.market_id]
    })
    .then(() => {
        next();
    })
    .catch(err => {
        next(err);
    });
};


module.exports = cardController;

