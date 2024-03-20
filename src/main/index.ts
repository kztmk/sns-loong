import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, ipcMain, shell } from 'electron';

import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import log from 'electron-log';
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
  firebaseUpdatePassword,
  firebaseVerifyEmail,
} from './firebase/auth';

import {
  DefaultConfigProps,
  MenuOrientation,
  ThemeDirection,
  ThemeMode,
} from '../renderer/src/types/config';
import { openFileDialog, openFileDialogForImage } from './fileSystem';

process.on('uncaughtException', (error) => {
  log.error('uncaughtException', error);
  log.error(error.stack);
  app.quit();
});

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

function createSplashWindow(): void {
  splashWindow = new BrowserWindow({
    width: 600,
    height: 600,
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  splashWindow.on('ready-to-show', () => {
    if (splashWindow) splashWindow.show();
  });

  splashWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.

  splashWindow.loadFile(join(__dirname, '../renderer/splash.html'));

  splashWindow.on('closed', () => {
    splashWindow = null;
  });
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
    if (mainWindow) {
      mainWindow.show();
    }
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

  // get app version
  ipcMain.handle('getAppVersion', async () => {
    return app.getVersion();
  });

  // return themeConfig;
  ipcMain.handle('getFromLocalStorage', async (_, key) => {
    return store.get(key);
  });

  // Save themeConfig
  ipcMain.handle('saveToLocalStorage', async (_, key, value) => {
    store.set(key, value);
    return { error: '' };
  });

  // ==== Firebase Auth ====
  // Firebase Sign In with email and password
  ipcMain.handle('firebaseEmailPasswordSignIn', async (_, email, password) => {
    return await firebaseEmailPasswordSignIn(email, password);
  });
  // Firebase Signout
  ipcMain.handle('firebaseSignOut', async (_) => {
    return await firebaseSignOut();
  });
  // Firebase Send Password Reset Email
  ipcMain.handle('firebaseSendPasswordResetEmail', async (_, email) => {
    return await firebaseSendPasswordResetEmail(email);
  });
  // Firebase user password update
  ipcMain.handle('firebaseUpdatePassword', async (_, password) => {
    return await firebaseUpdatePassword(password);
  });

  // Firebase update user profile
  ipcMain.handle('firebaseUpdateProfile', async (_, profile) => {
    return await firebaseUpDateProfile(profile);
  });
  // Firebase verify email
  ipcMain.handle('firebaseVerifyEmail', async (_, code) => {
    return await firebaseVerifyEmail(code);
  });

  // Handle file System
  ipcMain.handle('openFileDialog', async (_, args) => {
    return await openFileDialog(args);
  });

  ipcMain.handle('openFileDialogForImage', async (_, args) => {
    return await openFileDialogForImage(args);
  });

  createSplashWindow();
  setTimeout(() => {
    splashWindow?.hide();
    createWindow();
    splashWindow?.close();
  }, 3000);

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
