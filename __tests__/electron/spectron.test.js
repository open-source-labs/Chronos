const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');

// construct Paths:
const baseDir = path.join(__dirname, '..', '..');
let electronPath = path.join(baseDir, 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
  electronPath += '.cmd';
}

// utility functions
const sleep = time => new Promise(r => setTimeout(r, time));

describe('Application launch', () => {
  const app = new Application({
    path: electronPath,
    args: [baseDir],
  });

  beforeAll(() => {
    return app.start();
  });
  afterAll(() => {
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
        expect(res.width).toBeGreaterThan(800);
        expect(res.height).toBeGreaterThan(600);
      });
  });

  it('Checks window is visible', () => {
    return app.client
      .waitUntilWindowLoaded()
      .browserWindow.isVisible()
      .then(res => {
        expect(res).toBe.true;
      });
  });

  it('Window title is chronos', async () => {
    await app.client.waitUntilWindowLoaded();
    const title = await app.browserWindow.getTitle();
    return assert.equal(title, 'chronos');
  });

  it('Does not have the developer tools open', async () => {
    const devToolsAreOpen = await app.client
      .waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened();
    return assert.equal(devToolsAreOpen, false);
  });
});
