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
            throw new AxiosError(error.response.data.message || 'Unknown Error')
        }
    }

    async getInvoiceCards(data: InvoiceModel.Request.GetInvoiceCards): Promise<InvoiceModel.Response.GetInvoiceCards> {
        try {
            const urlParams = new URL(`${this.api}/invoice`)
            urlParams.searchParams.append('page', data.page.toString())
            urlParams.searchParams.append('pageSize', data.pageSize.toString())
            const response = await axios.get(urlParams.toString())     
            return response.data
        } catch (error:any) {
            console.error(error)
            throw new AxiosError(error.response.data.message || 'Unknown Error')
        }
    }

    async getInvoiceGraph(data: InvoiceModel.Request.GetInvoiceGraph): Promise<InvoiceModel.Response.GetInvoiceGraph> {
        try {
            const urlParams = new URL(`${this.api}/invoice/chart`)
            urlParams.searchParams.append('mode', data.mode)
            const response = await axios.get(urlParams.toString())
            return response.data
        } catch (error:any) {
            console.error(error)
            throw new AxiosError(error.response.data.message || 'Unknown Error')
        }
    }

}