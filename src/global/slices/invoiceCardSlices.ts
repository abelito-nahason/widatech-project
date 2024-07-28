import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InvoiceModel } from "../../domain/models/invoice";
import InvoiceUseCase from "../../domain/usecase/invoice";
import InvoiceAPI from "../../domain/api/invoice";
import { ThunkLoadingStates } from "../store";


const repo = new InvoiceUseCase(new InvoiceAPI())


export const getInvoiceCards:AsyncThunk<InvoiceModel.Response.GetInvoiceCards, InvoiceModel.Request.GetInvoiceCards, any> = createAsyncThunk(
    "invoice/getInvoice",
    async(data:InvoiceModel.Request.GetInvoiceCards) => {
        const response = await repo.getInvoiceCards(data)
        return response 
    }
)

type InitialState = {
    result: InvoiceModel.Response.GetInvoiceCards;
} & ThunkLoadingStates

const initialState:InitialState = {
    loading: 'idle',
    result: {result: [], totalRows: 0}
}

const invoiceCards = createSlice({
    name:"invoiceCards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInvoiceCards.fulfilled, (state,action) => {
            state.loading = 'succeeded',
            state.result = action.payload
        })

        builder.addCase(getInvoiceCards.pending, (state) => {
            state.loading = 'pending'
        })

        builder.addCase(getInvoiceCards.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default invoiceCards.reducer