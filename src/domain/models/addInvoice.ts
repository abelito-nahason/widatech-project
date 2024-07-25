import { object, string } from "yup";

export namespace InvoiceModel {
    export namespace Request {

        export interface Product {
            productName:string;
            productStock:number;
            productPictureSrc:string;
            productPrice:number;
        }

        export interface AddInvoice {
            transactionDate:string;
            customerName:string;
            salesName:string;
            notes:string;
            products:string;
            // products:Array<Product>;
        }

        export const invoiceSchema = object({
            transactionDate: string().required(),
            customerName: string().required(),
            salesName: string().required(),
            notes: string().required(),
            products:string().required()
        })
    }
    export namespace Response {
        export interface GenericActionResponse {
            message:string;
        }
    }
}