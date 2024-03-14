import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, ipcMain, session, shell } from 'electron';
import os from 'os';
import path from 'path';

import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import Store from 'electron-store';
import 'firebase/compat/auth';
import { join } from 'path';
import icon from '../../resources/icon.png?asset';
// B4TFY9TVXJXxuRhu
import {
  firebaseEmailPasswordSignIn,
  firebaseSendPasswordResetEmail,
  firebaseSignOut,
  firebaseUpDateProfile,
  firebaseUpdateEmail,
  firebaseUpdatePassword,
} from './firebase/auth';

import {
  DefaultConfigProps,
  MenuOrientation,
  ThemeDirection,
  ThemeMode,
} from '../renderer/src/types/config';
import { openFileDialog, openFileDialogForImage } from './fileSystem';
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// Generate instance of electron-store
const store = new Store<DefaultConfigProps>({
  /**
   * change file permissions to 644
   * -rw-r--r--
   */
  configFileMode: 0o644,
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Install DevTools
  if (is.dev) {
    // react-devtools fmkadmapgofadopljbjfkapdkoienihi
    const reactDevToolsPath = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/5.0.2_8'
    );

    async () => {
      await session.defaultSession.loadExtension(reactDevToolsPath, { allowFileAccess: true });
      await session.defaultSession.loadExtension(reactDevToolsPath, { allowFileAccess: true });
    };

    installExtension([REDUX_DEVTOOLS])
      .then((name) => console.log(`Added Extension: ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  let themeConfig = store.get('themeConfig');
  if (!themeConfig) {
    themeConfig = {
      fontFamily: `Inter var`,
      i18n: 'en',
      MenuOrientation: MenuOrientation.VERTICAL,
      menuCaption: true,
      miniDrawer: false,
      container: false,
      mode: ThemeMode.LIGHT,
      presetColor: 'default',
      ThemeDirection: ThemeDirection.LTR,
      themeContrast: false,
    };
  }
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // return themeConfig;
  ipcMain.handle('getFromLocalStorage', async (event, key) => {
    return store.get(key);
  });

  // Save themeConfig
  ipcMain.handle('saveToLocalStorage', async (event, key, value) => {
    store.set(key, value);
    return { error: '' };
  });

  // ==== Firebase Auth ====
  // Firebase Sign In with email and password
  ipcMain.handle('firebaseEmailPasswordSignIn', async (event, email, password) => {
    return await firebaseEmailPasswordSignIn(email, password);
  });
  // Firebase Signout
  ipcMain.handle('firebaseSignOut', async (event) => {
    return await firebaseSignOut();
  });
  // Firebase Send Password Reset Email
  ipcMain.handle('firebaseSendPasswordResetEmail', async (event, email) => {
    return await firebaseSendPasswordResetEmail(email);
  });
  // Firebase user password update
  ipcMain.handle('firebaseUpdatePassword', async (event, password) => {
    return await firebaseUpdatePassword(password);
  });
  // Firebase user email update
  ipcMain.handle('firebaseUpdateEmail', async (event, email) => {
    return await firebaseUpdateEmail(email);
  });
  // Firebase update user profile
  ipcMain.handle('firebaseUpdateProfile', async (event, profile) => {
    return await firebaseUpDateProfile(profile);
  });

  // Handle file System
  ipcMain.handle('openFileDialog', async (event, args) => {
    return await openFileDialog(args);
  });

  ipcMain.handle('openFileDialogForImage', async (event, args) => {
    return await openFileDialogForImage(args);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
