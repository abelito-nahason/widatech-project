import { configureStore } from "@reduxjs/toolkit";
import addInvoiceReducer from "../slices/addInvoiceSlices";
import invoiceCardSlices from "../slices/invoiceCardSlices";

const store = configureStore({
    reducer: {
        addInvoice: addInvoiceReducer,
        invoiceCards: invoiceCardSlices
    }
});

export type StoreDispatch = typeof store.dispatch;
export type StoreRootState = ReturnType<typeof store.getState>
export default store;