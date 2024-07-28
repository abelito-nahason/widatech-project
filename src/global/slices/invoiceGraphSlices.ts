import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../domain/api/invoice";
import InvoiceUseCase from "../../domain/usecase/invoice";
import { InvoiceModel } from "../../domain/models/invoice";
import { ThunkLoadingStates } from "../store";


const repo = new InvoiceUseCase(new InvoiceAPI())

export const getInvoiceGraph:AsyncThunk<InvoiceModel.Response.GetInvoiceGraph, InvoiceModel.Request.GetInvoiceGraph, any> = createAsyncThunk(
    "invoice/getInvoiceGraph", 
    async(data:InvoiceModel.Request.GetInvoiceGraph) => {
        const response = await repo.getInvoiceGraph(data)
        return response
    }
)

type InitialState = {
    data: InvoiceModel.Response.GetInvoiceGraph;
} & ThunkLoadingStates

const initialState:InitialState = {
    data: {
        result:[]
    },
    loading: 'idle'
}

const invoiceGraphSlice = createSlice({
    name: 'invoiceGraph',
    initialState,
    reducers: {
        resetGraphState(state){
            state.loading = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInvoiceGraph.fulfilled, (state,action) => {
            state.loading = 'succeeded',
            state.data = action.payload
        })

        builder.addCase(getInvoiceGraph.pending, (state) => {
            state.loading = 'pending'
        })

        builder.addCase(getInvoiceGraph.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})
export const {resetGraphState} = invoiceGraphSlice.actions
export default invoiceGraphSlice.reducer