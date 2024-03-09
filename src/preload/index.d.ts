import { AppUserType, NonReturningResultType } from '../renderer/types/auth';

declare global {
  interface Window {
    electronAPI: {
      signIn: (email: string, password: string) => Promise<AppUserType>;
      signOut: () => Promise<NonReturningResultType>;
      sendPasswordResetEmail: (email: string) => Promise<NonReturningResultType>;
      updateEmail: (newEmail: string) => Promise<NonReturningResultType>;
      updatePassword: (newPassword: string) => Promise<NonReturningResultType>;
      getFromLocalStorage: (key: string) => Promise<string | undefined>;
      saveToLocalStorage: (key: string, value: string) => Promise<NonReturningResultType>;
    };
  }
}

export {};
