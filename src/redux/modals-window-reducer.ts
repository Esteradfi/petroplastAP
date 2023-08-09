import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ModalsState {
    isRemoveCategory: boolean,
    isRemoveProduct: boolean,
    isAddCategory: boolean,
    isAddProduct: boolean,
    isDoneAddCategory: boolean,
    isDoneAddProduct: boolean,
    isDoneEditCategory: boolean,
    isViewCategory: boolean,
    isNotViewCategory: boolean,
    isOpen: boolean,
    modalData: {
        id: string
    }
};

const initialState: ModalsState = {
    isRemoveCategory: false,
    isRemoveProduct: false,
    isAddCategory: false,
    isAddProduct: false,
    isDoneAddCategory: false,
    isDoneAddProduct: false,
    isDoneEditCategory: false,
    isViewCategory: false,
    isNotViewCategory: false,
    isOpen: false,
    modalData: {
        id: ''
    }
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
        changeIsDoneEditCategory: (state, action: PayloadAction<boolean>) => {
            state.isDoneEditCategory = action.payload;
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
        setModalData: (state, action: PayloadAction<string>) => {
            state.modalData.id = action.payload;
        },
        clearModals: (state) => {
            state.isRemoveCategory = false;
            state.isRemoveProduct = false;
            state.isAddCategory = false;
            state.isAddProduct = false;
            state.isDoneAddCategory = false;
            state.isDoneAddProduct = false;
            state.isDoneEditCategory = false;
            state.isViewCategory = false;
            state.isNotViewCategory = false;
            state.modalData.id = ''
        },
    }
});

export default ModalsSlice.reducer;

export const {changeIsRemoveCategory, changeIsRemoveProduct, changeIsAddCategory, changeIsAddProduct,
                changeIsDoneAddCategory, changeIsDoneAddProduct, changeIsViewCategory, changeIsNotViewCategory,
                changeIsOpen, clearModals, setModalData, changeIsDoneEditCategory} = ModalsSlice.actions;