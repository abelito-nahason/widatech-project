import { SubmitHandler, useForm } from "react-hook-form"
import ButtonComponent from "../../components/ButtonComponent"
import InputComponent from "../../components/InputComponent"
import PaperComponent from "../../components/PaperComponent"
import TextAreaComponent from "../../components/TextAreaComponent"
import styles from "./index.module.css"
import { InvoiceModel } from "../../domain/models/addInvoice"
import {yupResolver} from '@hookform/resolvers/yup'



const AddInvoice = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<InvoiceModel.Request.AddInvoice>({
        defaultValues: {
            customerName: '',
            notes: '',
            products: '',
            salesName: '',
            transactionDate: ''
        },
        resolver: yupResolver(InvoiceModel.Request.invoiceSchema)
    })

    const submitForm:SubmitHandler<InvoiceModel.Request.AddInvoice> = (data) => {
        console.log(data)
    }

    return(
        <div className={styles.page}>
            <PaperComponent stackStyles={styles.form}>
                <form className={styles['hook-form']} onSubmit={handleSubmit(submitForm)}>  
                    <h1>Add Invoice</h1>
                    
                    <p>Transaction Date</p>
                    <InputComponent type="date" {...register('transactionDate')}/>

                    <p>Customer Name</p>
                    <InputComponent placeholder="Customer Name" {...register('customerName')}/>

                    <p>Salesperson Name</p>
                    <InputComponent placeholder="Salesperson Name" {...register('salesName')}/>

                    <p>Notes</p>
                    <TextAreaComponent placeholder="Notes (optional)" {...register('notes')}/>

                    <p>Products Sold</p>
                    <InputComponent placeholder="Products" {...register('products')}/>

                    <div className={styles['button-container']}>
                        <ButtonComponent stackedStyles={styles.button} type="submit"/>
                    </div>
                </form>
            </PaperComponent>
        </div>
    )

}

export default AddInvoice