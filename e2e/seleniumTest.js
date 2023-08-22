const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

async function localHostedTest(driver, servType, dbType, dbUri, dbName, dbDesc) {
  await driver.findElement(By.id('serv-type')).sendKeys(servType);
  await driver.findElement(By.id('db-type')).sendKeys(dbType);
  await driver.findElement(By.id('db-uri')).sendKeys(dbUri);
  await driver.findElement(By.id('db-name')).sendKeys(dbName);
  await driver.findElement(By.id('db-desc')).sendKeys(dbDesc);
  await driver.findElement(By.xpath('//button[text()="Submit"]')).click();
}

async function cloudHostedTest(
  driver,
  servType,
  awsInstance,
  awsRegion,
  awsAccessKey,
  awsSecretAccessKey,
  awsURL,
  awsName,
  dbDesc
) {
  await driver.findElement(By.id('serv-type')).sendKeys(servType);
  await driver.findElement(By.id('aws-instance')).sendKeys(awsInstance);
  await driver.findElement(By.id('aws-region')).sendKeys(awsRegion);
  await driver.findElement(By.id('aws-access-key')).sendKeys(awsAccessKey);
  await driver.findElement(By.id('aws-secret-access-key')).sendKeys(awsSecretAccessKey);
  await driver.findElement(By.id('aws-url')).sendKeys(awsURL);
  await driver.findElement(By.id('aws-name')).sendKeys(awsName);
  await driver.findElement(By.id('db-desc')).sendKeys(dbDesc);
  await driver.findElement(By.xpath('//button[text()="Submit"]')).click();
}

async function signupTest(driver, username, email, password, passwordConfirm) {
  await driver.wait(until.elementLocated(By.className('main-routes')), 30000);
  await driver.findElement(By.id('username')).sendKeys(username);
  await driver.findElement(By.id('email')).sendKeys(email);
  await driver.findElement(By.id('password')).sendKeys(password);
  await driver.findElement(By.id('passwordConfirm')).sendKeys(passwordConfirm);
  await driver.findElement(By.xpath('//button[text()="Sign Up"]')).click();
}

(async function () {
  const driver = new webdriver.Builder()
    .usingServer('http://localhost:9515')
    .withCapabilities({
      'goog:chromeOptions': {
        debuggerAddress: 'localhost:9222',
      },
    })
    .forBrowser('chrome')
    .build();

  try {
    await driver.wait(until.elementLocated(By.className('card')), 30000);
    await driver.findElement(By.className('card')).click();
    await driver.wait(until.elementLocated(By.className('add-container')), 10000);
    await driver.findElement(By.className('env-button2')).click();
    await driver.wait(until.elementLocated(By.className('add-container')), 10000);
    await localHostedTest(
      driver,
      'Docker',
      'SQL',
      'mongodb://localhost:27017/mydb',
      'Test Docker',
      'A description of my app'
    );

    await driver.findElement(By.id('card-add')).click();
    await driver.wait(until.elementLocated(By.className('add-container')), 10000);
    await driver.findElement(By.className('env-button2')).click();
    await driver.wait(until.elementLocated(By.className('add-container')), 10000);
    await localHostedTest(
      driver,
      'Kubernetes',
      'MongoDB',
      'mongodb://localhost:27017/mydb',
      'Test Kubernetes',
      'A description of my app'
    );

    await driver.findElement(By.id('card-add')).click();
    await driver.wait(until.elementLocated(By.className('add-container')), 10000);
    await driver.findElement(By.className('env-button')).click();
    await driver.wait(until.elementLocated(By.className('add-container')), 10000);
    await cloudHostedTest(
      driver,
      'Elastic Compute Cloud (EC2)',
      'i-1234567890abcdef0',
      'us-east-1',
      'your-access-key',
      'your-secret-access-key',
      'mongodb://your-mongodb-url',
      'Test AWS',
      'Test MongoDB Database'
    );

    await driver.findElement(By.className('personIconArea')).click();
    const signUpButton = await driver.wait(
      until.elementLocated(By.xpath('//span[text()="Sign Up"]')),
      10000
    );
    await driver.wait(until.elementIsEnabled(signUpButton), 10000);
    await signUpButton.click();
    await signupTest(driver, 'testUser', 'testEmail@test.com', 'testPassword', 'testPassword');

    console.log('E2E test completed successfully');
  } catch (error) {
    console.error('E2E test failed:', error);
  } finally {
    await driver.executeScript('window.close()');
    await driver.quit();
  }
})();
