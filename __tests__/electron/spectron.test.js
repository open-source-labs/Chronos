const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');

// Assert Facts About Promise Testing
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');

// construct Paths:
const baseDir = path.join(__dirname, '..', '..');
let electronPath = path.join(baseDir, 'node_modules', '.bin', 'electron');

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

describe('Application launch', () => {
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

  it('Opens a window', () => {
    return app.client.waitUntilWindowLoaded().getWindowCount().should.eventually.equal(2);
  });

  it('Should open a window to correct size', () => {
    return app.client
      .waitUntilWindowLoaded()
      .browserWindow.getBounds()
      .then(res => {
        expect(res.width).to.be.above(800);
        expect(res.height).to.be.above(600);
      });
  });

  it('is window is visible', () => {
    return app.client
      .waitUntilWindowLoaded()
      .browserWindow.isVisible()
      .then(res => {
        expect(res).to.be.true();
      });
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
