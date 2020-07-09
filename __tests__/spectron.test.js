const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');

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

describe('Application launch', function () {
  this.timeout(30000);

  this.beforeEach(() => app.start());
  this.afterEach(() => {
    if (app && app.isRunning) {
      app.stop();
    }
  });

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded().getWindowCount();
  });

  it('shows an initial window', async () => {
    await app.client.waitUntilWindowLoaded();
    const count = await app.client.getWindowCount();
    assert.equal(count, 2);
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
