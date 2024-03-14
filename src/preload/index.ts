import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  signIn: (email, password) => ipcRenderer.invoke('firebaseEmailPasswordSignIn', email, password),
  signOut: () => ipcRenderer.invoke('firebaseEmailPasswordSignOut'),
  sendPasswordResetEmail: (email) => ipcRenderer.invoke('firebaseSendPasswordResetEmail', email),
  updateEmail: (newEmail) => ipcRenderer.invoke('firebaseUpdateEmail', newEmail),
  updatePassword: (newPassword) => ipcRenderer.invoke('firebaseUpdatePassword', newPassword),
  getFromLocalStorage: (key) => ipcRenderer.invoke('getFromLocalStorage', key),
  saveToLocalStorage: (key, value) => ipcRenderer.invoke('saveToLocalStorage', key, value),
  openFileDialog: ({ title, filters }) => ipcRenderer.invoke('openFileDialog', { title, filters }),
  openFileDialogForImage: ({ title, filters }) =>
    ipcRenderer.invoke('openFileDialogForImage', { title, filters }),
  updateProfile: (profile) => ipcRenderer.invoke('firebaseUpdateProfile', profile),
});
