import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import headerReducer from "./header-reducer";
import modalsWindowReducer from "./modals-window-reducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        header: headerReducer,
        modals: modalsWindowReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;