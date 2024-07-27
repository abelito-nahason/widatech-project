import { forwardRef, LegacyRef } from 'react'
import styles from './index.module.css'

type InputComponentProps = {
    errortext?:string
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputComponent = forwardRef((props:InputComponentProps, ref:LegacyRef<HTMLInputElement> | undefined) => {
    return (
        <div className={styles['input-div']}>
            <input {...props} className={styles.input} ref={ref} />
            {Boolean(props.errortext) && <p className={styles['error-text']}>{props.errortext}</p>}
        </div>
    )
}) 

export default InputComponent