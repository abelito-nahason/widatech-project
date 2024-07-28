import { InvoiceModel } from "../models/invoice";

export default interface InvoiceRepository {
    addInvoice(data:InvoiceModel.Request.AddInvoice): Promise<InvoiceModel.Response.GenericActionResponse>
    getInvoiceCards(data:InvoiceModel.Request.GetInvoiceCards): Promise<InvoiceModel.Response.GetInvoiceCards>
    getInvoiceGraph(data:InvoiceModel.Request.GetInvoiceGraph): Promise<InvoiceModel.Response.GetInvoiceGraph>
}