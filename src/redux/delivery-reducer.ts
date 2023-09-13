import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import $api from '../http';

export interface DeliveryState {
    pickupContent: Content,
    deliveryContent: Content,
    deliveryRusContent: Content,
    paymentContent: Content,
}

export type Content = {
    text: string
}

const initialState: DeliveryState = {
    pickupContent: {
        text: '',
    },
    deliveryContent: {
        text: '',
    },
    deliveryRusContent: {
        text: '',
    },
    paymentContent: {
        text: '',
    }
}



export const DeliverySlice = createSlice({
    name: "Delivery",
    initialState,
    reducers: {
        changePickupText: (state, action: PayloadAction<string>) => {
            state.pickupContent.text = action.payload;
        },
        changeDeliveryText: (state, action: PayloadAction<string>) => {
            state.deliveryContent.text = action.payload;
        },
        changeDeliveryRusText: (state, action: PayloadAction<string>) => {
            state.deliveryRusContent.text = action.payload;
        },
        changePaymentText: (state, action: PayloadAction<string>) => {
            state.paymentContent.text = action.payload;
        },
    },
    extraReducers: (builder) => {

    }
})

export default DeliverySlice.reducer;

export const {changePickupText, changeDeliveryText, changeDeliveryRusText, changePaymentText} = DeliverySlice.actions;