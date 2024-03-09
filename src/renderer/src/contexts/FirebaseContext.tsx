import { ReactElement, createContext, useEffect, useReducer } from 'react';

// action - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project-imports
import { AuthProps, FirebaseContextType } from 'types/auth';
import Loader from '../components/Loader';

// const
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user: any) => {
        if (user) {
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                email: user.email!,
                name: user.displayName || 'Stebin Ben',
                role: 'UI/UX Designer',
              },
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const firebaseEmailPasswordSignIn = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const firebaseGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const firebaseTwitterSignIn = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const firebaseFacebookSignIn = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const firebaseRegister = async (email: string, password: string) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const logout = () => firebase.auth().signOut();

  const resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const updateProfile = () => {};
  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        login: () => {},
        firebaseGoogleSignIn,
        firebaseTwitterSignIn,
        firebaseFacebookSignIn,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
