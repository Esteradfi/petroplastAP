import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import $api from '../http';
//import type {PayloadAction} from '@reduxjs/toolkit';




export type AuthValues = {
    username: string,
    password: string
};

export const postLoginThunk = createAsyncThunk(
    'login',
    async (data: AuthValues) => {
        try {
            const response = await $api.post(`/auth/login`, data);
            localStorage.setItem('token', response.data.access_token);
            let blockTime = +new Date() + (3600 * 1000);
            localStorage.setItem('blockTime', blockTime.toString());
        } catch (err: any) {
            alert(err.response.data.message)
        }
    }
)

export interface AuthState {
    isAuth: boolean,
};

const initialState: AuthState = {
    isAuth: false,
};

export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
        },
        checkToken: (state) => {
            state.isAuth = true;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(postLoginThunk.fulfilled, (state, action) => {
            state.isAuth = true;
        })
    },
});

export default authSlice.reducer;

export const {logout, checkToken} = authSlice.actions;