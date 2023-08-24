import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import $api from '../http';

export interface CategoriesState {
    categoriesList: Array<CategoriesItem> | [],
    selectedImage: string,
    selectedImageName: string,
    selectedCategory: CategoriesItem,
    addCategoryDone: boolean,
    editCategoryDone: boolean,
};

export type CategoriesItem = {
    checkbox: boolean,
    name: string,
    image: string,
    _id: string,
    __v: string,
}

export type NewCategory = {
    name: string,
    image: string,
    checkbox: boolean
}

const initialState: CategoriesState = {
    categoriesList: [],
    selectedImage: '',
    selectedImageName: '',
    addCategoryDone: false,
    editCategoryDone: false,
    selectedCategory: {
        checkbox: false,
        name: '',
        image: '',
        _id: '',
        __v: '',
    }
};

export const getCategoriesThunk = createAsyncThunk(
    'Get categories',
    async () => {
        try {
            const response = await $api.get(`/category`);
            return response.data;
        } catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const postNewImageThunk = createAsyncThunk(
    'Post image',
    async (data: FormData) => {
        try {
            const response = await $api.post('/s3/upload', data);
            return response.data.uri;
        }
        catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const postNewCategoryThunk = createAsyncThunk(
    'Post category',
    async (data: NewCategory) => {
        try {
            const response = await $api.post('/category', data);
            return response.data;
        }
        catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const updateCategoryThunk = createAsyncThunk(
    'Update category',
    async (data: CategoriesItem) => {
        try {
            const response = await $api.patch(`/category/${data._id}`, data);
            return response.data;
        }
        catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const deleteCategoryThunk = createAsyncThunk(
    'Delete category',
    async (id: string) => {
        try {
            const response = await $api.delete(`/category/${id}`);
            return id;
        } catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const CategoriesSlice = createSlice({
    name: "Categories",
    initialState,
    reducers: {
        clearSelectedImage: (state) => {
            state.selectedImage = '';
            state.selectedImageName = '';
        },
        setSelectedCategory: (state, action: PayloadAction<CategoriesItem>) => {
            state.selectedCategory = action.payload;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = {
                checkbox: false,
                name: '',
                image: '',
                _id: '',
                __v: '',
            };
        },
        clearAddCategoryDone: (state) => {
            state.addCategoryDone = false;
        },
        clearEditCategoryDone: (state) => {
            state.editCategoryDone = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCategoriesThunk.fulfilled, (state, action) => {
            if(action.payload) {
                state.categoriesList = action.payload.reverse();
            } else {
                state.categoriesList = action.payload;
            }
        })
        .addCase(postNewImageThunk.fulfilled, (state, action) => {
            state.selectedImage = action.payload;
            let imageNameArr = action.payload.split('/');
            state.selectedImageName = imageNameArr[imageNameArr.length - 1];
        })
        .addCase(postNewCategoryThunk.fulfilled, (state, action) => {
            if(action.payload !== undefined) {
                state.addCategoryDone = true;
                let item = action.payload || null;

                state.categoriesList.reverse()[state.categoriesList.length] = item;
                state.categoriesList.reverse();
            }
        })
        .addCase(updateCategoryThunk.fulfilled, (state, action) => {
            if(action.payload !== undefined) {
                state.editCategoryDone = true;
                let index = state.categoriesList.findIndex(el => el._id === action.payload._id);
                let item = state.categoriesList[index];
                item.name = action.payload.name;
                item.image = action.payload.image;
                state.categoriesList[index] = item;
            }
        })
        .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
            let index = state.categoriesList.findIndex(el => el._id === action.payload);
            state.categoriesList.splice(index, 1);
        })
    },
});

export default CategoriesSlice.reducer;

export const {clearSelectedImage, setSelectedCategory, clearSelectedCategory, clearAddCategoryDone, clearEditCategoryDone} = CategoriesSlice.actions;