const electronMock = () => ({ ipcRenderer: { on: jest.fn(), send: jest.fn() } });

module.exports = electronMock;
