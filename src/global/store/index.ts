import { configureStore } from "@reduxjs/toolkit";
import addInvoiceReducer from "../slices/addInvoiceSlices";

const store = configureStore({
    reducer: {
        addInvoice: addInvoiceReducer
    }
});

export type StoreDispatch = typeof store.dispatch;
export type StoreRootState = ReturnType<typeof store.getState>
export default store;