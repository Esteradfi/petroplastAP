import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
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
            return true;
        } catch (err: any) {
            console.error('Ошибка отправки данных:', err);
            alert(err.message);
        }
    }
)

export interface AuthState {
    isAuth: boolean
};

const initialState: AuthState = {
    isAuth: false
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
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(postLoginThunk.fulfilled, (state, action) => {
            state.isAuth = action.payload || false;
        })
    },
});

export default authSlice.reducer;

export const {logout, checkToken} = authSlice.actions;