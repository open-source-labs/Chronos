/**
 * ************************************
 *
 * @module  MarketBox
 * @author  smozingo
 * @date    11/13/17
 * @description
 *
 * ************************************
 */

import React from 'react';


const MarketDisplay = (props) => (
  <div className="marketBox">
    <label htmlFor="marketId">Market ID: </label>
    <span id="marketId">{props.market.marketId}</span>
    <p>
      <label htmlFor="marketLocation">Location: </label>
      <span id="marketLocation">{props.market.location}</span>
    </p>
    <p>
      <label htmlFor="marketLocation">Cards: </label>
      <span id="marketLocation">{props.market.cards}</span>
    </p>
    <p>
      <label htmlFor="marketLocation">% of total: </label>
      <span id="marketLocation">{props.market.cards ? (props.market.cards / props.totalCards * 100).toFixed(2) : 0}</span>
    </p>
    <button type="button" name={props.market.marketId} onClick={props.addCard}>Add Card</button>
    <button type="button" name={props.market.marketId} onClick={props.deleteCard}>Delete Card</button>
  </div>
);

export default MarketDisplay;