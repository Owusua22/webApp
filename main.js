const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  console.log('🚀 App is ready');
  createWindow();

  // Trigger update check
  autoUpdater.checkForUpdatesAndNotify();
});

// Auto-update events
autoUpdater.on('update-available', () => {
  console.log('⬆️ Update available.');
});

autoUpdater.on('update-downloaded', () => {
  console.log('✅ Update downloaded.');
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'A new version has been downloaded. Restart now to apply the update?',
    buttons: ['Restart', 'Later']
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

app.on('window-all-closed', () => {
  console.log('❌ All windows closed');
  if (process.platform !== 'darwin') {
    console.log('🛑 App is quitting');
    app.quit();
  }
});
