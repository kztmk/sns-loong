import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

import type {
  AuthProps,
  LoggedInUserProfile,
  NonReturningResultType,
  UserProfile,
  UserProfileWithError,
} from '../../types/auth';
import { OpenFileDialogForImageReturnType } from '../../types/fileSystem';

const defaultUser: UserProfileWithError = {
  id: '',
  email: '',
  avatar: '',
  image: '',
  name: '',
  role: '',
  tier: '',
  error: '',
  verifyEmail: 'idel',
};

const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: defaultUser,
  token: null,
  error: '',
  updateItem: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    confirmEmail: (state) => {
      state.user.verifyEmail = 'success';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isInitialized = false;
      state.error = '';
      state.updateItem = 'idle';
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.isLoggedIn = true;
      state.user.id = action.payload.user.id;
      state.user.email = action.payload.user.email;
      state.user.avatar = action.payload.user.avatar;
      state.user.image = action.payload.user.image;
      state.user.name = action.payload.user.name;
      state.user.role = action.payload.user.role;
      state.user.tier = action.payload.user.tier;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = defaultUser;
      state.error = action.payload === undefined ? '' : action.payload.error;
    });
    builder.addCase(signOut.pending, (state) => {
      state.isInitialized = false;
      state.error = '';
      state.updateItem = 'idle';
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = defaultUser;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.user = defaultUser;
      state.error = action.payload === undefined ? '' : action.payload.error;
    });
    builder.addCase(updateAvatar.pending, (state) => {
      state.isInitialized = false;
      state.error = '';
      state.updateItem = 'avatar';
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.isInitialized = true;
      if (action.payload.canceled !== true) {
        state.user.image = `data:image/${action.payload.ext};base64,${action.payload.encodedImage}`;
        state.user.avatar = action.payload.downLoadUrl;
      }
    });
    builder.addCase(updateAvatar.rejected, (state, action) => {
      state.isInitialized = true;
      state.error = action.payload === undefined ? '' : action.payload.error;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isInitialized = false;
      state.error = '';
      state.updateItem = 'profile';
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.user.name = action.payload.name;
      state.user.avatar = action.payload.avatar;
      state.user.image = action.payload.image;
      state.user.role = action.payload.role;
      state.user.tier = action.payload.tier;
      state.user.email = action.payload.email;
      state.user.verifyEmail = action.payload.verifyEmail;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isInitialized = true;
      state.error = action.payload === undefined ? '' : action.payload.error;
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.isInitialized = false;
      state.error = '';
      state.updateItem = 'password';
    }),
      builder.addCase(updatePassword.fulfilled, (state) => {
        state.isInitialized = true;
      }),
      builder.addCase(updatePassword.rejected, (state, action) => {
        state.isInitialized = true;
        state.error = action.payload === undefined ? '' : action.payload.error;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const signIn = createAsyncThunk<
  LoggedInUserProfile,
  { email: string; password: string },
  {
    rejectValue: { error: string };
  }
>('auth/signIn', async (args, thunkApi) => {
  try {
    const response = await window.electronAPI.signIn(args.email, args.password);
    if (response.error.length === 0) {
      return response;
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

export const updateAvatar = createAsyncThunk<
  OpenFileDialogForImageReturnType,
  void,
  {
    rejectValue: { error: string };
  }
>('auth/upDateAvatar', async (_, thunkApi) => {
  try {
    const response = await window.electronAPI.openFileDialogForImage({
      title: 'Choose Avatar image',
      filters: [{ name: 'Image File', extensions: ['jpg', 'jpeg', 'svg', 'png', 'gif'] }],
    });

    if (response.error.length === 0) {
      return response;
    } else {
      return thunkApi.rejectWithValue({ error: response.error });
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const updateProfile = createAsyncThunk<
  UserProfileWithError,
  UserProfile,
  {
    rejectValue: { error: string };
  }
>(`auth/upDateProfile`, async (args, thunkApi) => {
  try {
    const response = await window.electronAPI.updateProfile(args);
    if (response.error.length === 0) {
      return response;
    } else {
      return thunkApi.rejectWithValue({ error: response.error });
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const updatePassword = createAsyncThunk<
  NonReturningResultType,
  string,
  {
    rejectValue: { error: string };
  }
>('auth/updatePassword', async (args, thunkApi) => {
  try {
    const response = await window.electronAPI.updatePassword(args);
    if (response.error.length === 0) {
      return response;
    } else {
      return thunkApi.rejectWithValue({ error: response.error });
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const { confirmEmail } = authSlice.actions;
export default authSlice.reducer;
