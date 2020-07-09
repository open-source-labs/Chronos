const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');

// Assert Facts About Promise Testing
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');

// construct Paths:
const baseDir = path.join(__dirname, '..');
const electronPath = path.join(baseDir, 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
  electronPath += '.cmd';
}
const app = new Application({
  path: electronPath,
  args: [baseDir],
});

global.before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

describe('Application launch', function () {
  this.timeout(30000);

  this.beforeAll(() => {
    chaiAsPromised.transferPromiseness = app.transferPromiseness;
    return app.start();
  });
  this.afterAll(() => {
    if (app && app.isRunning) {
      app.stop();
    }
  });

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded().getWindowCount().should.eventually.equal(2);
  });

  it('is window is visible', async () => {
    await app.client.waitUntilWindowLoaded();
    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);
  });

  it('window title is chronos', async () => {
    await app.client.waitUntilWindowLoaded();
    const title = await app.browserWindow.getTitle();
    assert.equal(title, 'chronos');
  });

  it('Does not have the developer tools open', async () => {
    const devToolsAreOpen = await app.client
      .waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened();
    return assert.equal(devToolsAreOpen, false);
  });
});
