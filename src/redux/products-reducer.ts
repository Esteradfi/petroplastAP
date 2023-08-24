import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import $api from '../http';

export interface ProductsState {
    title: string,
    productsList: Array<Product> | [],
    viewProductsList: Array<Product> | [],
    color: string,
    colorsList: Array<string> | [],
    selectedColors: Array<string> | string[],
    selectedImages: any,
    selectedProduct: Product,
    addProductDone: boolean,
    editProductDone: boolean,
    search: string
};

const initialState: ProductsState = {
    title: '',
    productsList: [],
    viewProductsList: [],
    color: '',
    colorsList: ['Белый', 'Черный', 'Графитовый', 'Розовый', 'Фисташковый', 'Коралловый', 'Коричневый', 'Темно-коричневый', 'Бежевый', 'Сиреневый', 'Синий', 'Голубой', 'Желтый', 'Серый', 'Терракотовый', 'Белый мрамор', 'Бирюзовый', 'Оливковый', 'Красный', 'Зеленый', 'Оранжевый', 'Фиолетовый', 'Бесцветный', 'Другой цвет'],
    selectedColors: [],
    selectedImages: [],
    selectedProduct: {
        category: '',
        article: '',
        material: '',
        name: '',
        colors:  [],
        height: 0,
        width: 0,
        length: 0,
        weightBrutto: 0,
        weightNetto: 0,
        retailPrice: 0,
        wholesalePrice: 0,
        quantityPerPackage: 0,
        stockBalance: 0,
        images: [],
        individualBarcode: '',
        generalBarcode: '',
        description: '',
        volume: 0,
        discount: 0,
        productHeight: 0,
        productWidth: 0,
        productLength: 0,
        packageHeight: 0,
        packageWidth: 0,
        packageLength: 0,
        __v: '',
        _id: ''
    },
    addProductDone: false,
    editProductDone: false,
    search: ''
};

export type Product = {
    category: string,
    article: string,
    material: string,
    name: string,
    colors:  Array<string> | [],
    height: number | string,
    width: number | string,
    length: number | string,
    weightBrutto: number | string,
    weightNetto: number | string,
    retailPrice: number | string,
    wholesalePrice: number | string,
    quantityPerPackage: number | string,
    stockBalance: number | string,
    images: Array<string> | [],
    individualBarcode: string,
    generalBarcode: string,
    description: string,
    volume?: number | string,
    discount?: number | string,
    productHeight?: number | string,
    productWidth?: number | string,
    productLength?: number | string,
    packageHeight?: number | string,
    packageWidth?: number | string,
    packageLength?: number | string,
    __v?: string,
    _id?: string
}

export const getProductsThunk = createAsyncThunk(
    'Get Products',
    async () => {
        try {
            const response = await $api.get(`/admins`);
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
    async (data: Product) => {
        try {
            const response = await $api.post('/admins/', data);
            return response.data;
        }
        catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const patchProductThunk = createAsyncThunk(
    'Patch product',
    async (data: Product) => {
        try {
            const response = await $api.patch(`admins/${data._id}`, data);
            return response.data;
        }
        catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const deleteProductThunk = createAsyncThunk(
    'Delete product',
    async (id: string) => {
        try {
            const response = await $api.delete(`/admins/${id}`);
            return id;
        } catch (err: any) {
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
        changeColors: (state, action: PayloadAction<string>) => {
            let actionColor = action.payload;
            let indexColor = state.selectedColors.indexOf(actionColor);
            if(indexColor !== -1) {
                state.selectedColors.splice(indexColor, 1);
            } else {
                state.selectedColors.push(actionColor);
            }
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
        clearAddProductDone: (state) => {
            state.addProductDone = false;
        },
        clearEditProductDone: (state) => {
            state.editProductDone = false;
        },
        setEditProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload;
        },
        setColors: (state, action: PayloadAction<Array<string>>) => {
            state.selectedColors = action.payload;
        },
        setImages: (state, action: PayloadAction<Array<string>>) => {
            state.selectedImages = action.payload;
        },
        changeSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        changeViewProducts: (state, action: PayloadAction<Array<Product>>) => {
            state.viewProductsList = action.payload;
        },
        clearSelectProduct: (state) => {
            state.selectedProduct = {
                category: '',
                article: '',
                name: '',
                material: '',
                colors:  [],
                height: 0,
                width: 0,
                length: 0,
                weightBrutto: 0,
                weightNetto: 0,
                retailPrice: 0,
                wholesalePrice: 0,
                quantityPerPackage: 0,
                stockBalance: 0,
                images: [],
                individualBarcode: '',
                generalBarcode: '',
                description: '',
                volume: 0,
                discount: 0,
                productHeight: 0,
                productWidth: 0,
                productLength: 0,
                packageHeight: 0,
                packageWidth: 0,
                packageLength: 0,
                __v: '',
                _id: ''
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProductsThunk.fulfilled, (state, action) => {
            if(action.payload) {
                state.productsList = action.payload.reverse();
                state.viewProductsList = action.payload;
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
        .addCase(postNewProductThunk.fulfilled, (state, action) => {
            if(action.payload) {
                state.addProductDone = true;
                if(state.productsList.length === 0) {
                    state.productsList[0] = action.payload;
                } else {
                    state.productsList.reverse();
                    state.productsList[state.productsList.length] = action.payload;
                    state.productsList.reverse();
                }
            }
        })
        .addCase(patchProductThunk.fulfilled, (state, action) => {
            if(action.payload !== undefined) {
                state.editProductDone = true;
                let actionId = action.payload._id;
                let index = state.productsList.findIndex(el => el._id === actionId);
                state.productsList[index] = {...action.payload};
                state.productsList[index].images = action.payload.images;
                state.productsList[index].colors = action.payload.colors;
            }
        })
        .addCase(deleteProductThunk.fulfilled, (state, action) => {
            let index = state.productsList.findIndex(el => el._id === action.payload);
            let indexView = state.viewProductsList.findIndex(el => el._id === action.payload);
            state.productsList.splice(index, 1);
            state.viewProductsList.splice(indexView, 1);
        })
    },
});

export default ProductsSlice.reducer;

export const {clearSelectedImages, clearColors, changeColors, changeColor, deleteImage, clearAddProductDone, clearSelectProduct, setEditProduct, setColors, setImages, clearEditProductDone, changeSearch, changeViewProducts} = ProductsSlice.actions;