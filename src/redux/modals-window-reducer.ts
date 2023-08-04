import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface ModalsState {
    isRemoveCategory: boolean,
    isRemoveProduct: boolean,
    isAddCategory: boolean,
    isAddProduct: boolean,
    isDoneAddCategory: boolean,
    isDoneAddProduct: boolean,
    isViewCategory: boolean,
    isNotViewCategory: boolean,
    isOpen: boolean
};

const initialState: ModalsState = {
    isRemoveCategory: false,
    isRemoveProduct: false,
    isAddCategory: false,
    isAddProduct: false,
    isDoneAddCategory: false,
    isDoneAddProduct: false,
    isViewCategory: false,
    isNotViewCategory: false,
    isOpen: false
};

export const ModalsSlice = createSlice({
    name: "Modals",
    initialState,
    reducers: {
        changeIsRemoveCategory: (state, action: PayloadAction<boolean>) => {
            state.isRemoveCategory = action.payload;
        },
        changeIsRemoveProduct: (state, action: PayloadAction<boolean>) => {
            state.isRemoveProduct = action.payload;
        },
        changeIsAddCategory: (state, action: PayloadAction<boolean>) => {
            state.isAddCategory = action.payload;
        },
        changeIsAddProduct: (state, action: PayloadAction<boolean>) => {
            state.isAddProduct = action.payload;
        },
        changeIsDoneAddCategory: (state, action: PayloadAction<boolean>) => {
            state.isDoneAddCategory = action.payload;
        },
        changeIsDoneAddProduct: (state, action: PayloadAction<boolean>) => {
            state.isDoneAddProduct = action.payload;
        },
        changeIsViewCategory: (state, action: PayloadAction<boolean>) => {
            state.isViewCategory = action.payload;
        },
        changeIsNotViewCategory: (state, action: PayloadAction<boolean>) => {
            state.isNotViewCategory = action.payload;
        },
        changeIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        clearModals: (state) => {
            state.isRemoveCategory = false;
            state.isRemoveProduct = false;
            state.isAddCategory = false;
            state.isAddProduct = false;
            state.isDoneAddCategory = false;
            state.isDoneAddProduct = false;
            state.isViewCategory = false;
            state.isNotViewCategory = false;
        }
    }
});

export default ModalsSlice.reducer;

export const {changeIsRemoveCategory, changeIsRemoveProduct, changeIsAddCategory, changeIsAddProduct,
                changeIsDoneAddCategory, changeIsDoneAddProduct, changeIsViewCategory, changeIsNotViewCategory,
                changeIsOpen, clearModals} = ModalsSlice.actions;