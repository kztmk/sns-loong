import {
  AuthError,
  UserCredential,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';

import firebaseApp from '../index';

import { getImageData } from '../../fileSystem';
import type { LoggedInUserProfile, UserProfile } from '../types';

const auth = getAuth(firebaseApp);

const firebaseEmailPasswordSignIn = async (email: string, password: string) => {
  let appUser: UserProfile = {
    id: '',
    email: '',
    avatar: '',
    image: '',
    name: '',
  };

  const loggedInUser: LoggedInUserProfile = {
    user: appUser,
    error: '',
  };

  try {
    const user: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    loggedInUser.user.id = user.user.uid ?? '';
    loggedInUser.user.email = user.user.email ?? '';
    loggedInUser.user.name = user.user.displayName ?? '';
    loggedInUser.user.avatar = user.user.photoURL ?? '';
    if (user.user.photoURL) {
      loggedInUser.user.image = await getImageData(user.user.photoURL);
    }
    return loggedInUser;
  } catch (error) {
    if (error as AuthError) {
      loggedInUser.error = (error as AuthError).message;
      return appUser;
    } else {
      loggedInUser.error = 'Unknown error';
      return appUser;
    }
  }
};

const returnError = (error: string) => {
  return { error: error };
};

const getCurrentUserId = () => {
  return auth.currentUser?.uid;
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

const firebaseUpDateProfile = async (profile: UserProfile) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(auth.currentUser, {
        displayName: profile.name,
        photoURL: profile.avatar,
      });
      return {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        image: profile.image,
        error: '',
      };
    } else {
      return { ...profile, error: 'current user not found' };
    }
  } catch (error) {
    return { ...profile, error: 'Unknown error' };
  }
};

export {
  firebaseEmailPasswordSignIn,
  firebaseSendPasswordResetEmail,
  firebaseSignOut,
  firebaseUpDateProfile,
  firebaseUpdateEmail,
  firebaseUpdatePassword,
  getCurrentUserId,
};
