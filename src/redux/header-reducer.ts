import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'

export interface HeaderState {
    title: string
};

const initialState: HeaderState = {
    title: ''
};

export const HeaderSlice = createSlice({
    name: "Header",
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        }
    }
});

export default HeaderSlice.reducer;

export const {changeTitle} = HeaderSlice.actions;