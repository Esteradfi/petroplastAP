import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import categoriesReducer from "./categories-reducer";
import headerReducer from "./header-reducer";
import modalsWindowReducer from "./modals-window-reducer";
import productsReducer from "./products-reducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        header: headerReducer,
        modals: modalsWindowReducer,
        categories: categoriesReducer,
        products: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;