import {
  LoggedInUserProfile,
  NonReturningResultType,
  UserProfileWithError,
} from '../renderer/src/types/auth';
declare global {
  interface Window {
    electronAPI: {
      signIn: (email: string, password: string) => Promise<LoggedInUserProfile>;
      signOut: () => Promise<NonReturningResultType>;
      sendPasswordResetEmail: (email: string) => Promise<NonReturningResultType>;
      updateEmail: (newEmail: string) => Promise<NonReturningResultType>;
      updatePassword: (newPassword: string) => Promise<NonReturningResultType>;
      getFromLocalStorage: (key: string) => Promise<string | undefined>;
      saveToLocalStorage: (key: string, value: string) => Promise<NonReturningResultType>;
      openFileDialog: (args: OpenFileDialogArgs) => Promise<OpenDialogReturnType>;
      openFileDialogForImage: (args: OpenFileDialogArgs) => Promise<OpenDialogForImageReturnType>;
      updateProfile: (profile: UserProfile) => Promise<UserProfileWithError>;
    };
  }
}

export {};
