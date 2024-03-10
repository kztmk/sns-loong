import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

import type { AppUserType, AuthProps, NonReturningResultType } from '../../types/auth';

const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  token: null,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isInitialized = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload === undefined ? '' : action.payload.error;
    });
    builder.addCase(signOut.pending, (state) => {
      state.isInitialized = false;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload === undefined ? '' : action.payload.error;
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const signIn = createAsyncThunk<
  AppUserType,
  { email: string; password: string },
  {
    rejectValue: { error: string };
  }
>('auth/signIn', async (args, thunkApi) => {
  try {
    const response = await window.electronAPI.signIn(args.email, args.password);
    if (response.error.length === 0) {
      return response.user;
    } else {
      return thunkApi.rejectWithValue({ error: response.error });
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const signOut = createAsyncThunk<
  NonReturningResultType,
  void,
  {
    rejectValue: { error: string };
  }
>('auth/signOut', async (_, thunkApi) => {
  try {
    const response = await window.electronAPI.signOut();
    if (response.error.length === 0) {
      return response;
    } else {
      return thunkApi.rejectWithValue({ error: response.error });
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export default authSlice.reducer;
