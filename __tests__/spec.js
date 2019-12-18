const { Application } = require('spectron');
const assert = require('assert');
const electronPath = require('electron');
const path = require('path');

describe('Application launch', function () {
  this.timeout(10000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')],
    });
    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1);
    });
  });
});
