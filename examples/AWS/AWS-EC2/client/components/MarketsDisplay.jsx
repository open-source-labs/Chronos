/**
 * ************************************
 *
 * @module  MarketsDisplay
 * @author  smozingo
 * @date    11/13/17
 * @description
 *
 * ************************************
 */

import React from 'react';
import MarketDisplay from './MarketDisplay.jsx';


const MarketsDisplay = (props) => {
  const markets = [];
  for (let i = 0; i < props.markets.length; i++) {
    markets.push(<MarketDisplay id={i} key={i}
                                market={props.markets[i]}
                                totalCards={props.totalCards}
                                addCard={props.addCard}
                                deleteCard={props.deleteCard}/>)
  }
  return(
    <div className="displayBox">
      <h4>Markets</h4>
      {markets}
    </div>
  )
}



export default MarketsDisplay;