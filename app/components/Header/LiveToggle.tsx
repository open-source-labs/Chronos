import React from 'react';

const LiveToggle = ({ live, toggleLive }) => {
  return (
    <button onClick={toggleLive}>
      {live ? (
        <div><span id="live">Live</span></div>
      ) : (
        <div id="gatherLiveData">Gather Live Data</div>
      )}
    </button>
  );
};

export default LiveToggle;