import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import $api from '../http';

export interface CategoriesState {
    categoriesList: Array<CategoriesItem> | [],
};

export type CategoriesItem = {
    name: string,
    image: string,
    _id: string,
    __v: string,
}

const initialState: CategoriesState = {
    categoriesList: []
};

export const getCategoriesThunk = createAsyncThunk(
    'Get categories',
    async () => {
        try {
            const response = await $api.get(`/category`);
            console.log(response.data);
            return response.data;
        } catch (err: any) {
            console.error('Ошибка отправки данных:', err);
            alert(err.message);
        }
    }
)

export const CategoriesSlice = createSlice({
    name: "Categories",
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<string>) => {

        }
    }
});

export default CategoriesSlice.reducer;

export const {changeTitle} = CategoriesSlice.actions;