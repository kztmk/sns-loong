import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { KeepMeSignIn, NonReturningResultType } from '../../types/auth';
import type { RootState } from '../index';

export const initialState = {
  email: '',
  password: '',
  checked: false,
  loading: false,
  error: '',
};

const KeepMeSignInSlice = createSlice({
  name: 'keepMeSignIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKeepMeSignInFromLocalStorage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKeepMeSignInFromLocalStorage.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && (action.payload as KeepMeSignIn)) {
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.checked = true;
      }
    });
    builder.addCase(getKeepMeSignInFromLocalStorage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload === undefined ? 'Unknown error' : action.payload.error;
    });
  },
});

export const getKeepMeSignInFromLocalStorage = createAsyncThunk<
  KeepMeSignIn | undefined,
  void,
  {
    rejectValue: NonReturningResultType;
  }
>('keepMeSignIn/getKeepMeSignInFromLocalStorage', async (_, thunkApi) => {
  try {
    const response = await window.electronAPI.getFromLocalStorage('keepMeSignIn');
    return typeof response !== 'undefined' ? JSON.parse(response) : undefined;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const saveKeepMeSignInToLocalStorage = createAsyncThunk<
  KeepMeSignIn,
  KeepMeSignIn,
  {
    rejectValue: NonReturningResultType;
  }
>('keepMeSignIn/saveKeepMeSignInToLocalStorage', async (keepMeSignIn, thunkApi) => {
  try {
    const response = await window.electronAPI.saveToLocalStorage(
      'keepMeSignIn',
      JSON.stringify(keepMeSignIn)
    );
    if (response.error.length === 0) {
      return keepMeSignIn;
    } else {
      return thunkApi.rejectWithValue(response.error);
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const selectKeepMeSignIn = (state: RootState) => state.keepMeSignIn;

export default KeepMeSignInSlice.reducer;
