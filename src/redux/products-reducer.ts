import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import $api from '../http';

export interface ProductsState {
    title: string,
    productsList: any,
    color: string,
    selectedColors: Array<string> | string[],
    selectedImages: any,
};

const initialState: ProductsState = {
    title: '',
    productsList: [],
    color: '',
    selectedColors: [],
    selectedImages: [],
};

export type Product = {
    category: string,
    article: string,
    name: string,
    colors:  Array<string> | [],
    height: number,
    width: number,
    length: number,
    weightBrutto: number,
    weightNetto: number,
    retailPrice: number,
    wholesalePrice: number,
    quantityPerPackage: number,
    stockBalance: number,
    images: Array<string> | [],
    individualBarcode: string,
    generalBarcode: string,
    description: string,
    volume?: number,
    discount?: number,
    productHeight?: number,
    productWidth?: number,
    productLength?: number,
    packageHeight?: number,
    packageWidth?: number,
    packageLength?: number
}

export const getProductsThunk = createAsyncThunk(
    'Get Products',
    async () => {
        try {
            const response = await $api.get(`/admins`);
            console.log(response.data);
            return response.data;
        } catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const postNewProductsImageThunk = createAsyncThunk(
    'Post image Product',
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

export const postNewProductThunk = createAsyncThunk(
    'Post product',
    async (data: any) => {
        try {
            const response = await $api.post('/admins/', data);
            console.log(response.data);
            return response.data;
        }
        catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const ProductsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        clearSelectedImages: (state) => {
            state.selectedImages = [];
        },
        addColor: (state) => {
            if(state.color) {
                state.selectedColors.push(state.color);
            }

        },
        deleteColor: (state, action: PayloadAction<string>) => {
            let color = action.payload;
            let index = state.selectedColors.indexOf(color);
            state.selectedColors.splice(index, 1);
        },
        clearColors: (state) => {
            state.selectedColors = [];
        },
        changeColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
        deleteImage: (state, action: PayloadAction<string>) => {
            let image = action.payload;
            let index = state.selectedImages.indexOf(image);
            state.selectedImages.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProductsThunk.fulfilled, (state, action) => {
            if(action.payload) {
                state.productsList = action.payload.reverse();
            } else {
                state.productsList = action.payload;
            }
        })
        .addCase(postNewProductsImageThunk.fulfilled, (state, action) => {
            if(state.selectedImages.length < 5) {
                state.selectedImages.push(action.payload);
            } else {
                alert("Добавлено максимальное количество фотографий")
            }
        })
    },
});

export default ProductsSlice.reducer;

export const {clearSelectedImages, clearColors, addColor, deleteColor, changeColor, deleteImage} = ProductsSlice.actions;