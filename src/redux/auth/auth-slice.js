import { createSlice } from '@reduxjs/toolkit';
import { register, login, current, logout, updateTheme } from './auth-operation';
import { pending, rejected } from '../../shared/functions/redux';
const initialState = {
  user: {},
  token: '',
  isLogin: false,
  isLoading: false,
  error: null,
  theme: "light"
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(register.pending, pending)
            .addCase(register.fulfilled, (state, {payload}) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLogin = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state) => {
              state.isLoading = false;
          })
            .addCase(login.pending, pending)
            .addCase(login.fulfilled, (state, {payload}) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLogin = true;
                state.isLoading = false;
              state.error = null;
              state.theme = payload.theme
            })
            .addCase(login.rejected , (state) => {
              state.isLoading = false;
          })
            .addCase(current.pending, pending)
            .addCase(current.fulfilled, (state, { payload }) => {
              const { name, email, avatarURL, theme } = payload.message
              state.user = { name, email, avatarURL, theme};
              state.isLogin = true;
              state.isLoading = false;
              state.error = null;
            })
            .addCase(current.rejected, (state) => {
                state.isLoading = false;
                state.token = "";
            })
            .addCase(updateTheme.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
          .addCase(updateTheme.fulfilled, (state, action) => {
              state.isLoading = false;
              state.user.theme = action.meta.arg;
          })
            .addCase(updateTheme.rejected, (state, action) => {
            })
            .addCase(logout.pending, pending)
            .addCase(logout.fulfilled, state => {
                state.isLoading = false;
                state.isLogin = false;
                state.user = {};
                state.token = '';
             })
          .addCase(logout.rejected, rejected);


    }
})


export default authSlice.reducer;
