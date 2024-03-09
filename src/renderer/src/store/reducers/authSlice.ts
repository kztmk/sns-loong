import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

import type { AuthProps } from '../../types/auth';

const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isLoggedIn = true;
      state.isInitialized = true;
      state.user = action.payload;
      state.token = action.payload?.token;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.isInitialized = true;
      state.user = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
