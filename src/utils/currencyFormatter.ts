



const currencyFormatter = (amount:number) => {

    const format = new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR'}).format(amount)
    return format
}

export default currencyFormatter

