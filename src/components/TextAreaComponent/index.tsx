import { forwardRef, LegacyRef } from 'react'
import styles from './index.module.css'

type InputComponentProps = {

} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const TextAreaComponent = forwardRef((props:InputComponentProps,ref:LegacyRef<HTMLTextAreaElement> | undefined) => {

    return (
        <textarea {...props} rows={5} className={styles.input} ref={ref} />
    )

}) 

export default TextAreaComponent