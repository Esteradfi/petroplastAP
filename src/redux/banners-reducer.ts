import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import $api from '../http';

export interface BannersState {
    bannersList: Array<Banner> | [],
    selectedImage: string,
    addBannerDone: boolean
}
export type BannerImage = {
    image: string;
}

export type Banner = {
    links: Array<string>,
    __v: string,
    _id: string
}

const initialState: BannersState = {
    bannersList: [],
    selectedImage: "",
    addBannerDone: false
}

export const getBannersThunk = createAsyncThunk(
    'Get Banners',
    async () => {
        try {
            const response = await $api.get(`/baners`);
            return response.data;
        } catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const postBannerImageThunk = createAsyncThunk(
    'Post image Banner',
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

export const postNewBannerThunk = createAsyncThunk(
    'Post banner',
    async (data: BannerImage) => {
        try {
            const response = await $api.post('/baners', data);
            return response.data;
        }
        catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const deleteBannerThunk = createAsyncThunk(
    'Delete banner',
    async (id: string) => {
        try {
            const response = await $api.delete(`/baners/${id}`);
            return id;
        } catch (err: any) {
            alert(err.response.data.message);
        }
    }
)

export const BannersSlice = createSlice({
    name: "Banners",
    initialState,
    reducers: {
        changeSelectedImage: (state, action: PayloadAction<string>) => {
            state.selectedImage = action.payload;
        },
        changeAddBannerDone: (state, action: PayloadAction<boolean>) => {
            state.addBannerDone = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBannersThunk.fulfilled, (state, action) => {
                state.bannersList = action.payload;
            })
            .addCase(postBannerImageThunk.fulfilled, (state, action) => {
                state.selectedImage = action.payload;
            })
            .addCase(postNewBannerThunk.fulfilled, (state, action) => {
                if(state.bannersList.length < 5) {
                    state.bannersList[state.bannersList.length] = action.payload;
                    state.addBannerDone = true;
                }
            })
            .addCase(deleteBannerThunk.fulfilled, (state, action) => {
                let index = state.bannersList.findIndex(el => el._id === action.payload);
                state.bannersList.splice(index, 1);
            })
    }
})

export default BannersSlice.reducer;

export const {changeSelectedImage, changeAddBannerDone} = BannersSlice.actions;