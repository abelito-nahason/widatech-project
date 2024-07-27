import { InvoiceModel } from "../models/invoice";

export default interface InvoiceRepository {
    addInvoice(data:InvoiceModel.Request.AddInvoice): Promise<InvoiceModel.Response.GenericActionResponse>
}