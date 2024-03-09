import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import auth from './reducers/authSlice';
import config from './reducers/configSlice';
import keepMeSignIn from './reducers/keepMeSignIn';
import menu from './reducers/menuSlice';
import snackbar from './reducers/snackbarSlice';

const rootReducer = combineReducers({
  auth,
  snackbar,
  menu,
  config,
  keepMeSignIn,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;
