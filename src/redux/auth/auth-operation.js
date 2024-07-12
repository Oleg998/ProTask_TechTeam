import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';

import {
  registerRequest,
  loginRequest,
  currentRequest,
  logoutRequest,
} from 'api/auth-api';

import { postUserTheme } from 'api/theme-api';

export const register = createAsyncThunk(
  'auth/register',
  async (body, { rejectWithValue }) => {

    try {
      const data = await registerRequest(body);
      Notify.success('Registration has been successful!');
      return data;
    } catch (error) {
      Notify.failure(
        'Wrong email or password. The password must contain at least 8 symbols.'
      );
      return rejectWithValue(console.log(error.response.data.message));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      const data = await loginRequest(body);
      Notify.success("You've successfully logged in!");
      return data;
    } catch (error) {
      Notify.failure('Wrong email or password');
      return rejectWithValue(console.log(error.response.data.message));
    }
});

export const current = createAsyncThunk(
  "auth/current",
  async(_, {rejectWithValue, getState}) => {
      try{
          const {auth} = getState();
          const data = await currentRequest(auth.token);
          return data;
      }
      catch(error){
          return rejectWithValue(error.response.data.message)
      }
  },
  {
      condition: (_, {getState}) => {
          const {auth} = getState();
          if(!auth.token) {
              return false
          };
      }

  })


export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutRequest();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateTheme = createAsyncThunk(
  'auth/updateTheme',
  async (theme, { rejectWithValue }) => {
    try {
      const response = await postUserTheme(theme);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
