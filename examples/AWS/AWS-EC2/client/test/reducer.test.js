import cardsReducer from '../reducers/cardsReducer.js';

describe('cardsReducer', () => {
  let startState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    startState = {
        marketList: [],
        lastMarketId: 10000,
        newLocation: '',
        totalCards: 0,
        totalMarkets: 0,
      };
  });

  it('should provide a default state', () => {
    const result = cardsReducer(undefined, fakeAction);
    expect(result).toEqual(startState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = cardsReducer(startState, fakeAction);
    expect(result).toBe(startState);
  });

  describe('ADD_MARKET', () => {
    let action;

    beforeEach(() => {
      action = { 
          type: 'ADD_MARKET',
          payload: {
              marketId: '10001',
              location: 'Venice',
            },
        };
    });

    it('should increment total market count by one', () => {
      const result = cardsReducer(startState, action);
      expect(result).toHaveProperty('totalMarkets', 1);
    });

    it('should return a new state object', () => {
      const result = cardsReducer(startState, action);
      expect(result).not.toBe(startState);
    });
  });
});
