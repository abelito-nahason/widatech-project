import { forwardRef, LegacyRef } from 'react'
import styles from './index.module.css'

type InputComponentProps = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputComponent = forwardRef((props:InputComponentProps, ref:LegacyRef<HTMLInputElement> | undefined) => {
    return (
        <input {...props} className={styles.input} ref={ref} />
    )
}) 

export default InputComponent