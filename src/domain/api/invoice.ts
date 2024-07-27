import axios, { AxiosError } from "axios";
import { InvoiceModel } from "../models/invoice";
import InvoiceRepository from "../repository/invoice";


export default class InvoiceAPI implements InvoiceRepository {
    readonly api = import.meta.env.VITE_API

    async addInvoice(data: InvoiceModel.Request.AddInvoice): Promise<InvoiceModel.Response.GenericActionResponse> {
        try {
            const url = `${this.api}/invoice`
            const response = await axios.post(url, data)
            return response.data
        } catch (error:any) {
            console.error(error)
            // return {
            //     message: error.response.data.message || 'Unknown Error'
            // } 
            throw new AxiosError(error.response.data.message || 'Unknown Error')
        }
    }

}