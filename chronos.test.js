const chronos = require('./chronos');
const { expect } = require('chai');

describe('"chronos.js" tests', () => {
  describe('checking for all appropriate methods', () => {
    it("should have the 'use' method", () => {
      expect(chronos).to.have.own.property('use');
    });
    it("should have the 'propogate' method", () => {
      expect(chronos).to.have.own.property('propagate');
    });
    it("should have the 'track' method", () => {
      expect(chronos).to.have.own.property('track');
    });
  });
});
