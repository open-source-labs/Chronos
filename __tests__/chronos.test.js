const chronos = require('../chronos');

describe('"chronos.js" tests', () => {
  describe('checking for all appropriate methods', () => {
    it("should have the 'use' method", () => {
      expect(chronos).toHaveProperty('use');
    });
    it("should have the 'propogate' method", () => {
      expect(chronos).toHaveProperty('propagate');
    });
    it("should have the 'track' method", () => {
      expect(chronos).toHaveProperty('track');
    });
  });
});
