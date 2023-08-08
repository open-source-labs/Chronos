const mongoose = require('mongoose');
const alert = require('../../chronos_npm_package/controllers/alert');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mockAxios = new MockAdapter(axios);

const consoleLogSpy = jest.spyOn(console, 'log');
jest.spyOn(console, 'error').mockImplementation(() => {});
// jest.mock('axios', () => {
//     return {
//       post: jest.fn(),
//     };
//   });
  


describe('alert.sendSlack', () => {
  beforeEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('should send Slack message with the correct data', async () => {
    const code = 500;
    const slackSettings = {
      webhook: 'https://example.com/slack-webhook',
    };
    const message = 'Internal server error';
    const expectedData = { text: `${code}, ${message}, ${Date.now()}` };
    mockAxios.onPost(slackSettings.webhook).reply(200, 'Status Code >= 400...\nError message sent');
    await alert.sendSlack(code, message, slackSettings);

    expect(mockAxios.onPost).toHaveBeenCalledWith(slackSettings.webhook, expectedData, expect.any(Object));
    expect(consoleLogSpy).toHaveBeenCalledWith('Status Code >= 400...\nError message sent');
  });
});
