/**
 * ************************************
 *
 * @module  cardsReducer
 * @author  smozingo
 * @date    11/13/17
 * @description reducer for loyalty card data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
  marketList: [],
  lastMarketId: 10000,
  newLocation: '',
  totalCards: 0,
  totalMarkets: 0,
};

const cardsReducer = (state=initialState, action) => {
  let marketList;
  let lastMarketId;
  let totalMarkets;
  let totalCards;
  
  switch(action.type) {
    case types.UPDATE_MARKETS:
      const markets = action.payload;
      lastMarketId = -Infinity;
      totalCards = 0;
      totalMarkets = markets.length;
      marketList = state.marketList.slice();
      
      // push the markets on the market list
      markets.forEach(market => {
        const newMarket = {
          location: market.location,
          marketId: market.id,
          cards: market.cardCount,
        }

        marketList.push(newMarket);

        // update the last market id so we can have the right value if we create another
        lastMarketId = market.id > lastMarketId ? market.id : lastMarketId;
        totalCards += +market.cardCount;
      })

      return {
        ...state,
        marketList,
        lastMarketId,
        totalMarkets,
        totalCards,
        newLocation: '',
      };
      
    case types.ADD_MARKET:
      // increment counters
      lastMarketId = state.lastMarketId + 1;
      totalMarkets = state.totalMarkets + 1;

      // create the new market from provided data
      const newMarket = {
        location: action.payload.location,
        marketId: action.payload.marketId,
        cards: 0,
      };

      // push the new market on the market list
      marketList = state.marketList;
      marketList.push(newMarket);

      // return updated state
      return {
        ...state,
        marketList,
        lastMarketId,
        totalMarkets,
        newLocation: '',
      };

    case types.SET_NEW_LOCATION:
      return {
        ...state,
        newLocation: action.payload,
      };

    case types.ADD_CARD:
      marketList = state.marketList.slice();
      totalCards = state.totalCards;
      for(let i = 0; i < marketList.length; i++) {
        if(marketList[i].marketId == action.payload) {
          marketList[i].cards++;
          totalCards++;
          break;
        }
      }

      return {
        ...state,
        marketList,
        totalCards,
      };

    case types.DELETE_CARD:
      marketList = state.marketList.slice();
      totalCards = state.totalCards;
      for(let i = 0; i < marketList.length; i++) {
        if(marketList[i].marketId == action.payload && marketList[i].cards > 0) {
          marketList[i].cards--;
          totalCards--;
          break;
        }
      }
      return {
        ...state,
        marketList,
        totalCards,
      };

    default:
      return state;
  }
};

export default cardsReducer;