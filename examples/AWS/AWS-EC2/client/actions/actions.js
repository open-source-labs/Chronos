/**
 * ************************************
 *
 * @module  actions.js
 * @author  smozingo
 * @date    11/13/17
 * @description Action Creators
 *
 * ************************************
 */

import * as types from '../constants/actionTypes'

const actions = {};

const createMarket = (marketId, location) => ({
     type: types.ADD_MARKET,
     payload: {marketId, location},
});

const addCard = (marketId) => ({
  type: types.ADD_CARD,
  payload: marketId,
});

const deleteCard = (marketId) => ({
  type: types.DELETE_CARD,
  payload: marketId,
});

actions.setNewLocation = (location) => ({
  type: types.SET_NEW_LOCATION,
  payload: location,
});

actions.updateMarkets = (markets) =>  ({
  type: types.UPDATE_MARKETS,
  payload: markets,
});


actions.createMarketThunk = (lastMarketId, location) => dispatch => {
  const marketId = +lastMarketId + 1;

  fetch('/api/addMarket', {
    method: 'POST',
    body: JSON.stringify({ market_id: marketId, location }),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => {
    if(res.status === 200) {
      dispatch(createMarket(marketId, location));
    } else {
      console.log('in createMarketThunk - Server returned status', res.status)
    }
  })  
  .catch(err => console.log('Error in createMarketThunk fetch:', err));
  
}

actions.addCardThunk = (marketId) => dispatch => {
  fetch('/api/addCard', {
    method: 'POST',
    body: JSON.stringify({ market_id: marketId }),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => {
    if(res.status === 200) {
      dispatch(addCard(marketId));
    } else {
      console.log('in addCardThunk - Server returned status', res.status)
    }
  })  
  .catch(err => console.log('Error in addCardThunk fetch:', err));
}

actions.deleteCardThunk = (marketId) => dispatch => {
  fetch('/api/deleteCard', {
    method: 'POST',
    body: JSON.stringify({ market_id: marketId }),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => {
    if(res.status === 200) {
      dispatch(deleteCard(marketId));
    } else {
      console.log('in deleteCardThunk - Server returned status', res.status)
    }
  })  
  .catch(err => console.log('Error in deleteCardThunk fetch:', err));
}


export default actions;