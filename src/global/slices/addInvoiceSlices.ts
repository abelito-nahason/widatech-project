import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceUseCase from "../../domain/usecase/invoice";
import InvoiceAPI from "../../domain/api/invoice";
import { InvoiceModel } from "../../domain/models/invoice";
import { ThunkLoadingStates } from "../store";

const repo = new InvoiceUseCase(new InvoiceAPI())


export const addInvoice:AsyncThunk<string, InvoiceModel.Request.AddInvoice, any> = createAsyncThunk(
    "invoice/addInvoice",
    async(data:InvoiceModel.Request.AddInvoice) => {
        const response = await repo.addInvoice(data)
        return response.message as string
    }
)


type InitialState = {
    message: string;
} & ThunkLoadingStates

const initialState:InitialState = {
    loading: 'idle',
    message: ''
}

const invoiceSlice = createSlice({
    name:"invoices",
    initialState,
    reducers: {
        resetPopup(state) {
            state.loading = 'pending'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addInvoice.fulfilled, (state,action) => {
            state.loading = 'succeeded', // to make pop-up to show briefly
            state.message = action.payload
        })

        builder.addCase(addInvoice.pending, (state) => {
            state.loading = 'pending'
        })

        builder.addCase(addInvoice.rejected, (state,action) => {
            state.loading = 'failed'
            state.message = action.payload as string
        })
    }
})

export const {resetPopup} = invoiceSlice.actions

export default invoiceSlice.reducer