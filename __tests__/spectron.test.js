const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');
const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if(process.platform === "win32"){
  electronPath += ".cmd";
}

describe('Application launch', function () {
  this.timeout(30000);

  const app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '..')],
  });

  beforeEach(()=>app.start())
  afterEach(()=>app.stop())  

  it('shows an initial window', async () => {
      await app.client.waitUntilWindowLoaded();
      const count = await app.client.getWindowCount();
      assert.equal(count, 1);
    });
  it('is window is visible', async () =>{
    await app.client.waitUntilWindowLoaded();
    const isVisible = await app.browserWindow.isVisible();
    assert.equal(isVisible, true);
  });
  it('window title is chronos', async () =>{
    await app.client.waitUntilWindowLoaded();
    const title = await app.browserWindow.getTitle();
    assert.equal(title, 'chronos');
  });
});


