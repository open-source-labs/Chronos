const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');

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

describe('Application launch', () => {
  beforeEach(() => {
    return app.start();
  });
  afterEach(() => {
    if (app && app.isRunning) {
      app.stop();
    }
  });

  it('Opens a window', async () => {
    await app.client.waitUntilWindowLoaded();
    const count = await app.client.getWindowCount();
    return assert.equal(count, 1);
  });

  it('Should open a window to correct size', async () => {
    return app.client
      .waitUntilWindowLoaded()
      .browserWindow.getBounds()
      .then(res => {
        console.log(res);
        expect(res.width).toBeGreaterThan(800);
        expect(res.height).toBeGreaterThan(600);
      });
  });

  xit('is window is visible', () => {
    // return app.client
    //   .waitUntilWindowLoaded()
    //   .browserWindow.isVisible()
    //   .then(res => {
    //     expect(res).to.be.true();
    //   });
    return app.client.waitUntilWindowLoaded();
  });

  xit('window title is chronos', async () => {
    await app.client.waitUntilWindowLoaded();
    const title = await app.browserWindow.getTitle();
    assert.equal(title, 'chronos');
  });

  xit('Does not have the developer tools open', async () => {
    const devToolsAreOpen = await app.client
      .waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened();
    return assert.equal(devToolsAreOpen, false);
  });
});
