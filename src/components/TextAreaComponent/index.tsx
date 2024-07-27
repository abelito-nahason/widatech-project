import { forwardRef, LegacyRef } from 'react'
import styles from './index.module.css'

type InputComponentProps = {
    errortext?:string
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const TextAreaComponent = forwardRef((props:InputComponentProps,ref:LegacyRef<HTMLTextAreaElement> | undefined) => {

    return (
        <div className={styles['input-container']}>
            <textarea {...props} rows={5} className={styles.input} ref={ref} />
            {Boolean(props.errortext) && <p className={styles['error-text']}>{props.errortext}</p>}
        </div>
    )

}) 

export default TextAreaComponent