import {
  AuthError,
  UserCredential,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from 'firebase/auth';

import firebaseApp from '../index';

import type { AppUserType } from '../types';

const auth = getAuth(firebaseApp);

const firebaseEmailPasswordSignIn = async (email: string, password: string) => {
  let appUser: AppUserType = {
    id: '',
    email: '',
    name: '',
    error: '',
  };

  try {
    const user: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    (appUser.id = user.user.uid),
      (appUser.email = user.user.email ?? ''),
      (appUser.name = user.user.displayName ?? '');
    return appUser;
  } catch (error) {
    if (error as AuthError) {
      appUser.error = (error as AuthError).message;
      return appUser;
    } else {
      appUser.error = 'Unknown error';
      return appUser;
    }
  }
};

const returnError = (error: string) => {
  return { error: error };
};

const firebaseSignOut = async () => {
  try {
    await auth.signOut();
    return returnError('');
  } catch (error) {
    return returnError('Unknown error');
  }
};

const firebaseSendPasswordResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return returnError('');
  } catch (error) {
    return returnError('Unknown error');
  }
};

const firebaseUpdateEmail = async (newEmail: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateEmail(auth.currentUser, newEmail);
      return returnError('');
    } else {
      return returnError('current user not found');
    }
  } catch (error) {
    return returnError('Unknown error');
  }
};

const firebaseUpdatePassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(auth.currentUser, newPassword);
      return returnError('');
    } else {
      return returnError('current user not found');
    }
  } catch (error) {
    return returnError('Unknown error');
  }
};

export {
  firebaseEmailPasswordSignIn,
  firebaseSendPasswordResetEmail,
  firebaseSignOut,
  firebaseUpdateEmail,
  firebaseUpdatePassword,
};
