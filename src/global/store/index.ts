import { configureStore } from "@reduxjs/toolkit";
import addInvoiceReducer from "../slices/addInvoiceSlices";
import invoiceCardReducer from "../slices/invoiceCardSlices";
import invoiceGraphReducer from "../slices/invoiceGraphSlices";

const store = configureStore({
    reducer: {
        addInvoice: addInvoiceReducer,
        invoiceCards: invoiceCardReducer,
        invoiceGraph: invoiceGraphReducer
    }
});

export type StoreDispatch = typeof store.dispatch;
export type StoreRootState = ReturnType<typeof store.getState>
export type ThunkLoadingStates = {
    loading: 'idle' | 'pending' | "succeeded" | 'failed'
}
export default store;