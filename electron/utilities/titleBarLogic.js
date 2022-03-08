// const remote = require('electron').remote;

const { ipcRenderer } = require('electron');
const maxButton = document.getElementById('max-btn');
const ipc = ipcRenderer;

maxButton.addEventListener('click', () => {
  ipc.send('maximizeApp');
});

export const test = 'console.log(remote)';
