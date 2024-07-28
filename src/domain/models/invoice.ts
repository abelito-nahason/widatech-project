import { array, number, object, string } from "yup";

export namespace InvoiceModel {
    export namespace Request {

        export interface Product {
            productId:string;
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
            products:Array<{
                productId:string;
                productName:string;
                productStock:number;
                productPrice:number;
            }>;
        }

        export const invoiceSchema = object({
            transactionDate: string().required(),
            customerName: string().required(),
            salesName: string().required(),
            notes: string().defined().strict(true),
            products:array().of(object({
                productId: string().required(),
                productName: string().required(),
                productStock: number().required(),
                productPrice: number().required()
            })).required().min(1)
        })

        export interface GetInvoiceCards {
            page:number;
            pageSize:number;
        }

    }
    export namespace Response {
        export interface GenericActionResponse {
            message:string;
        }

        export interface GetInvoiceCards {
            result: {
                invoice_no:number;
                transaction_date:string;
                salesperson:string;
                customer:string;
                notes:string;
                total_amount:number;
            }[];
            totalRows:number;
        }
    }
}