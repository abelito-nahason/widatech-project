import styles from './index.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch, StoreRootState } from '../../global/store';
import { getInvoiceCards } from '../../global/slices/invoiceCardSlices';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import currencyFormatter from '../../utils/currencyFormatter';

const InvoiceCard = () => {
    const [page,setPage] = useState(1)
    const [pageSize,setPageSize] = useState(9)
    const selector = useSelector((state:StoreRootState)=> state.invoiceCards)
    const dispatch = useDispatch<StoreDispatch>()
    const maxPage = Math.ceil((selector.result.totalRows || 0) / pageSize)
    const pageSizeOptions = [6,9,12]

    const prevPage = () => {
        if(page >= 2) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    const nextPage = () => {
        if((page + 1) <= maxPage) {
            setPage((page) + 1)
        }
    }


    useEffect(()=> {
        dispatch(getInvoiceCards({page, pageSize}))
    },[page, pageSize])

    if(selector.loading === 'pending') return (
        <>
            <h1>Invoice Card</h1>
            <CircularProgress/>
        </>
    )

    return (
        <>
            <h1>Invoice Card</h1>
            <div className={styles.container}>
            {
                selector.result.result.map((card)=> (
                    <div key={card.invoice_no} className={styles.card}>  
                        <h3>{`Invoice No: ${card.invoice_no}`}</h3>
                        <p>{`Customer Name: ${card.customer}`} </p>
                        <p>{`Salesperson Name: ${card.salesperson}`} </p>
                        <p>{`Total Amount: ${currencyFormatter(card.total_amount)}`} </p>
                        <p>{`Notes: ${card.notes}`}</p>
                    </div>
                ))
            }
            </div>
            <div className={styles['bottom-bar']}>
                <p>{`Total Rows: ${selector.result.totalRows || 0}`}</p>
                <div className={styles.pagination}>
                    <TextField select 
                            variant="outlined" 
                            size="small" 
                            SelectProps={{native:true}} 
                            value={pageSize}
                            onChange={(e)=> setPageSize(parseInt(e.target.value))}
                            >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={Number(opt)}>{Number(opt)}</option>
                        ))}
                    </TextField>
                    <IconButton onClick={prevPage} disabled={page === 1}><ArrowBack/></IconButton>
                    <IconButton onClick={nextPage} disabled={page === maxPage}><ArrowForward/></IconButton>
                </div>
            </div>
        </>
    )

}

export default InvoiceCard