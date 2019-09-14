const { app, BrowserWindow } = require('electron');
let win;
function createWindow (){
   win = new BrowserWindow({
       width: 900,
       height: 700,
       webPreferences: {
           nodeIntegration: true
       }
   })
   win.loadURL('http://localhost:8080/')
   win.on('closed', () => {
       win = null
   })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
       app.quit()
   }
})
app.on('activate', () => {
   if (win === null) {
       createWindow()
   }
})

