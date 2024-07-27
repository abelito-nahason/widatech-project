import currencyFormatter from '../../utils/currencyFormatter'
import styles from './index.module.css'
import products from './products.json'
import { debounce } from '../../utils/debounce'
import { Dispatch, SetStateAction, useState } from 'react'
import { IconButton } from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { InvoiceModel } from '../../domain/models/invoice'
import { UseFormSetValue } from 'react-hook-form'

type AutocompleteComponentProps = {
    value: InvoiceModel.Request.AddInvoice['products'];
    setValue: UseFormSetValue<InvoiceModel.Request.AddInvoice>;
    errortext?:string;
}

type OnSelectProps = {
    productId:string;
} & Omit<AutocompleteComponentProps, 'errortext'> 

type OnQuantityChange = {
    productId:string; 
    action:"increase" | "decrease";
} & Omit<AutocompleteComponentProps, 'errortext'>

const onQuantityChange = ({action, productId, value, setValue}:OnQuantityChange) => {
    const cloneArr = [...value]

    let selectedItem = products.find((item)=> item.productId === productId)
    let product = cloneArr.find((item)=> item.productId === productId)

    if(!selectedItem) return
    if(!product) return
    
    const index = cloneArr.findIndex((item)=> item.productId === productId)

    if(action === 'increase') {
        if(product.productStock + 1 <= selectedItem.productStock ) {
            cloneArr[index].productStock = product.productStock + 1
        }
    }

    if(action === 'decrease') {
        if(product.productStock - 1 === 0 ) {
            cloneArr.splice(index, 1)
        } else cloneArr[index].productStock = product.productStock - 1
    }

    setValue('products',cloneArr)
}   

const onSelect = ({productId, value, setValue}:OnSelectProps) => {
    const cloneArr = [...value]
    let selectedItem = products.find((item)=> item.productId === productId)
    let alreadyExists = cloneArr.find((item)=> item.productId === productId)

    
    if(selectedItem && !alreadyExists) {
         let {productPictureSrc, ...rest} = selectedItem

        const newSelectedItem = {
            ...rest,
            productStock: 1
        }
        cloneArr.push(newSelectedItem)
    } 

    setValue('products', cloneArr)
}



const AutocompleteComponent = ({value, setValue, errortext}:AutocompleteComponentProps) => {
    const [filterArray, setFilterArray] = useState<typeof products>(products)
    const [selectionPop, setSelectionPop] = useState(false)
    const [currentInputValue, setCurrentInputValue] = useState('')

    const filterAutoComplete = (string:string) => {
        let result = products.filter(item => true == (item.productName.toLowerCase().startsWith(string.toLowerCase()) && string !== ''))
        setFilterArray(result)
    }

    const onChange = (value:string) => {
        filterAutoComplete(value)
        setCurrentInputValue(value)
    }


    let displayArray = filterArray.length !== 0 || currentInputValue ? filterArray : products

    return (
        <>
            <div className={styles['input-container']} tabIndex={0}>
                <input className={styles.input} 
                       type='text' placeholder='Search product...' onChange={debounce((e)=>onChange(e.target.value), 250)} 
                       onFocus={()=>setSelectionPop(true)} 
                       onBlur={()=> setSelectionPop(false)}/>
                {Boolean(errortext) && <p className={styles['error-text']}>{errortext}</p>}

                {selectionPop && <div className={styles['options-container']} onMouseDown={(e)=>e.preventDefault()}>
                    <div className={styles['options-inner-container']}>
                        {displayArray.map((item) => (
                            <div key={item.productId} 
                            className={styles.options} 
                            aria-disabled={item.productId === value.find((selectedItem)=> selectedItem.productId === item.productId)?.productId}
                            onClick={()=> onSelect({productId:item.productId, value, setValue})} 
                            >
                                <img src={item.productPictureSrc} width={128} height={128}/>
                                <div> 
                                    <p>{item.productName}</p>
                                    <p>{`Stock: ${item.productStock}`}</p>
                                    <p>{`Price: ${currencyFormatter(item.productPrice)}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
            {
                value.map((item) => (
                    <div key={item.productId} className={styles.options}>
                    <img src={products.find((productsItem)=> productsItem.productId === item.productId)?.productPictureSrc} width={128} height={128}/>
                    <div> 
                        <p>{item.productName}</p>
                        <p>{`Quantity: ${item.productStock}`}</p>
                        <p>{`Price: ${currencyFormatter(item.productPrice * item.productStock)}`}</p>
                        <div>
                            <IconButton 
                            onClick={()=> onQuantityChange({action:'decrease', productId: item.productId, value, setValue})}
                            >
                                <ArrowDownward/>
                            </IconButton>
                            <IconButton 
                            onClick={()=> onQuantityChange({action:'increase', productId: item.productId, value, setValue})}
                            disabled={item.productStock === products.find((selectedItem)=> selectedItem.productId === item.productId)?.productStock}
                            >
                                <ArrowUpward/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                ))
            }
        </>
    )
}

export default AutocompleteComponent