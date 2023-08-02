import {createSlice} from '@reduxjs/toolkit';
//import type {PayloadAction} from '@reduxjs/toolkit';

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

    }
});

export default authSlice.reducer;

