/**
 * ************************************
 *
 * @module  MarketCreator
 * @author  smozingo
 * @date    11/13/17
 * @description
 *
 * ************************************
 */

import React from 'react';

const MarketCreator = props => (
  <div>
    <form>
      <h4>Create New Market</h4>
      <label htmlFor="location">Location:</label>
      <input id="location" type="text" onChange={props.updateLocation} value={props.newLocation}/>
      <button type="button" onClick={(e) => props.createMarket(e, props.lastMarketId, props.newLocation)}>Add Market</button>
    </form>
  </div>
);

export default MarketCreator;