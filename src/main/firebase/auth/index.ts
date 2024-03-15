import {
  AuthError,
  UserCredential,
  applyActionCode,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
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
      return { error: '' };
    } else {
      return { error: 'current user not found' };
    }
  } catch (error) {
    if (error as AuthError) {
      return { error: (error as AuthError).message };
    }
    return { error: 'Unknown error' };
  }
};

const firebaseUpDateProfile = async (profile: UserProfile) => {
  try {
    const user = auth.currentUser;
    let verifyEmail = 'idle';
    if (user) {
      await updateProfile(auth.currentUser, {
        displayName: profile.name,
        photoURL: profile.avatar,
      });
      console.log('profile update done');
      // update email?
      if (profile.email && user.email !== profile.email) {
        await verifyBeforeUpdateEmail(auth.currentUser, profile.email);
        verifyEmail = 'pending';
      }
      return {
        id: user.uid,
        email: profile.email,
        name: user.displayName,
        avatar: profile.avatar,
        image: profile.image,
        error: '',
        verifyEmail: verifyEmail,
      };
    } else {
      return { ...profile, error: 'current user not found' };
    }
  } catch (error) {
    console.log('error: ', error);
    return { ...profile, error: 'Unknown error' };
  }
};

const firebaseVerifyEmail = async (code: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await applyActionCode(auth, code);
      return { error: '' };
    } else {
      return { error: 'Unkonwn error' };
    }
  } catch (error) {
    if (error as AuthError) {
      switch ((error as AuthError).code) {
        case 'auth/expired-action-code':
          return { error: 'The action code has expired.' };
        case 'auth/invalid-verification-code':
          return {
            error:
              'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
          };
        case 'auth/user-disabled':
          return { error: 'The user corresponding to the provided action code has been disabled.' };
        case 'auth/user-not-found':
          return { error: 'The user corresponding to the action code was not found.' };
        default:
          return { error: 'Unknown auth error' };
      }
    } else {
      return { error: 'Unknown error can not convert to AuthError' };
    }
  }
};

export {
  firebaseEmailPasswordSignIn,
  firebaseSendPasswordResetEmail,
  firebaseSignOut,
  firebaseUpDateProfile,
  firebaseUpdatePassword,
  firebaseVerifyEmail,
  getCurrentUserId,
};
