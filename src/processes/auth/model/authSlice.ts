import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearFavorites } from '@/features/toggle-favorite/model/favoritesSlice';
import { baseApi } from '@/shared/api/baseApi';
import type { RootState } from '@/app/store';

type AuthStatus =
  | 'idle'
  | 'checking'
  | 'authenticated'
  | 'unauthenticated'
  | 'unsupported';

type AuthState = {
  status: AuthStatus;
  errorMessage: string | null;
  supportMessage: string | null;
};

const initialState: AuthState = {
  status: 'idle',
  errorMessage: null,
  supportMessage: null,
};

async function runWebAuth() {
  if (typeof window === 'undefined') {
    return {
      supported: false,
      reason: 'Authentication is unavailable during server rendering.',
    } as const;
  }

  return {
    supported: false,
    reason: 'Biometric authentication is not available in web browsers.',
  } as const;
}

export const authenticateOnLaunch = createAsyncThunk(
  'auth/authenticateOnLaunch',
  async () => {
    const auth = await runWebAuth();
    return auth;
  },
);

export const authenticateWithBiometrics = createAsyncThunk(
  'auth/authenticateWithBiometrics',
  async () => {
    const auth = await runWebAuth();
    return auth;
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await dispatch(clearFavorites());
    dispatch(baseApi.util.resetApiState());
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateOnLaunch.pending, (state) => {
        state.status = 'checking';
        state.errorMessage = null;
        state.supportMessage = null;
      })
      .addCase(authenticateOnLaunch.fulfilled, (state, action) => {
        if (!action.payload.supported) {
          state.status = 'unsupported';
          state.supportMessage = action.payload.reason;
          return;
        }

        state.status = 'unauthenticated';
        state.errorMessage = 'Authentication failed. Please try again.';
      })
      .addCase(authenticateOnLaunch.rejected, (state) => {
        state.status = 'unauthenticated';
        state.errorMessage = 'Unable to run biometric authentication.';
      })
      .addCase(authenticateWithBiometrics.pending, (state) => {
        state.status = 'checking';
        state.errorMessage = null;
      })
      .addCase(authenticateWithBiometrics.fulfilled, (state, action) => {
        if (!action.payload.supported) {
          state.status = 'unsupported';
          state.supportMessage = action.payload.reason;
          return;
        }

        state.status = 'unauthenticated';
        state.errorMessage = 'Authentication failed. Please try again.';
      })
      .addCase(authenticateWithBiometrics.rejected, (state) => {
        state.status = 'unauthenticated';
        state.errorMessage = 'Unable to run biometric authentication.';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'unauthenticated';
        state.errorMessage = null;
      });
  },
});

export const authReducer = authSlice.reducer;

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.status === 'authenticated' || state.auth.status === 'unsupported';
export const selectAuthStatus = (state: RootState): AuthStatus => state.auth.status;
export const selectAuthErrorMessage = (state: RootState): string | null =>
  state.auth.errorMessage;
export const selectAuthSupportMessage = (state: RootState): string | null =>
  state.auth.supportMessage;
