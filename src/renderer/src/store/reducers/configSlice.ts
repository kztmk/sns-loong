import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// types
import { NonReturningResultType } from '../../types/auth';
import { DefaultConfigProps } from '../../types/config';

import config from '../../config';

export type ConfigState = {
  loading: boolean;
  error: string;
  config: DefaultConfigProps;
};

const initialState = {
  loading: false,
  error: '',
  config,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConfigFromLocalStorage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getConfigFromLocalStorage.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && (action.payload as DefaultConfigProps)) {
        state.config = action.payload as DefaultConfigProps;
      }
    });
    builder.addCase(getConfigFromLocalStorage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload === undefined ? 'Unknown error' : action.payload.error;
    });
    builder.addCase(saveConfigToLocalStorage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveConfigToLocalStorage.fulfilled, (state, action) => {
      state.loading = false;
      state.config = action.payload;
    });
    builder.addCase(saveConfigToLocalStorage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload === undefined ? 'Unknown error' : action.payload.error;
    });
  },
});

export const getConfigFromLocalStorage = createAsyncThunk<
  DefaultConfigProps | undefined,
  void,
  {
    rejectValue: NonReturningResultType;
  }
>('config/getFromLocalStrage', async (_, thunkApi) => {
  try {
    const response = await window.electronAPI.getFromLocalStorage('themeConfig');
    return typeof response !== 'undefined' ? JSON.parse(response) : undefined;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const saveConfigToLocalStorage = createAsyncThunk<
  DefaultConfigProps,
  { key: string; value: any },
  {
    rejectValue: NonReturningResultType;
  }
>('config/saveToLocalStorage', async (config, thunkApi) => {
  console.log('saveConfig');
  try {
    const rootState = thunkApi.getState() as RootState;
    const newConfig = { ...rootState.config.config, [config.key]: config.value };
    const response = await window.electronAPI.saveToLocalStorage(
      'themeConfig',
      JSON.stringify(newConfig)
    );
    if (response.error.length === 0) {
      return newConfig;
    } else {
      return thunkApi.rejectWithValue({ error: response.error });
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
//9cRqKonszQkTe9Kc

export const selectConfig = (state: RootState) => state.config;

export default configSlice.reducer;
