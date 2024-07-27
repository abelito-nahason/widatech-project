import { SubmitHandler, useForm } from "react-hook-form"
import ButtonComponent from "../../components/ButtonComponent"
import InputComponent from "../../components/InputComponent"
import PaperComponent from "../../components/PaperComponent"
import TextAreaComponent from "../../components/TextAreaComponent"
import styles from "./index.module.css"
import { InvoiceModel } from "../../domain/models/invoice"
import {yupResolver} from '@hookform/resolvers/yup'
import AutocompleteComponent from "../../components/AutocompleteComponent"
import { StoreDispatch, StoreRootState } from "../../global/store"
import { useDispatch, useSelector } from "react-redux"
import { addInvoice } from "../../global/slices/addInvoiceSlices"
import PresetModal from "../../components/PresetModal"
import { useEffect, useState } from "react"



const AddInvoice = () => {
    const [modal, setModal] = useState(false)
    const selector = useSelector<StoreRootState>((state)=> state.addInvoice.loading)
    const dispatch = useDispatch<StoreDispatch>()
    const {register, handleSubmit, formState:{errors}, setValue, watch} = useForm<InvoiceModel.Request.AddInvoice>({
        defaultValues: {
            customerName: '',
            notes: '',
            salesName: '',
            transactionDate: '',
            products: []
        },
        resolver: yupResolver(InvoiceModel.Request.invoiceSchema)
    })

    const submitForm:SubmitHandler<InvoiceModel.Request.AddInvoice> = (data) => {
        console.log(data)
        dispatch(addInvoice(data))
    }

    useEffect(()=> {
        if(selector === 'succeeded') setModal(true)
    },[selector])

    return(
        <div className={styles.page}>
            <PresetModal open={modal} onClose={()=>setModal(false)}>
                <>
                    <h1>Success</h1>
                    <p>Success adding data</p>
                    <ButtonComponent text="Dismiss" onClick={()=> setModal(false)}/>
                </>
            </PresetModal>

            <PaperComponent stackStyles={styles.form}>
                <form className={styles['hook-form']} onSubmit={handleSubmit(submitForm)}>  
                    <h1>Add Invoice</h1>
                    
                    <p>Transaction Date</p>
                    <InputComponent type="date" {...register('transactionDate')} errortext={errors.transactionDate?.message}/>

                    <p>Customer Name</p>
                    <InputComponent placeholder="Customer Name" {...register('customerName')} errortext={errors.customerName?.message}/>

                    <p>Salesperson Name</p>
                    <InputComponent placeholder="Salesperson Name" {...register('salesName')} errortext={errors.salesName?.message}/>

                    <p>Notes</p>
                    <TextAreaComponent placeholder="Notes (optional)" {...register('notes')} errortext={errors.notes?.message}/>

                    <p>Products Sold</p>                    
                    <AutocompleteComponent
                        value={watch('products')}
                        setValue={setValue}
                        errortext={errors.products?.message}
                    />

                    <div className={styles['button-container']}>
                        <ButtonComponent stackedStyles={styles.button} type="submit" text="Submit"/>
                    </div>
                </form>
            </PaperComponent>
        </div>
    )

}

export default AddInvoice