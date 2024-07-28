import { InvoiceModel } from "../models/invoice";
import InvoiceRepository from "../repository/invoice";


export default class InvoiceUseCase implements InvoiceRepository {
    constructor(private repository: InvoiceRepository) {}

    async addInvoice(data: InvoiceModel.Request.AddInvoice): Promise<InvoiceModel.Response.GenericActionResponse> {
        return this.repository.addInvoice(data)
    }

    async getInvoiceCards(data: InvoiceModel.Request.GetInvoiceCards): Promise<InvoiceModel.Response.GetInvoiceCards> {
        return this.repository.getInvoiceCards(data)
    }
}