import { CircularProgress } from '@mui/material'
import styles from './index.module.css'

type ButtonComponentProps = {
    stackedStyles?: CSSModuleClasses[string]
    loading?:boolean;
    text:string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ButtonComponent = ({stackedStyles, loading, text, ...props}:ButtonComponentProps) => {

    return (
        <button aria-disabled={loading} className={`${stackedStyles} ${styles.button}`} {...props}>
            {loading ? <CircularProgress size={20}/> : text}
        </button>
    )
}

export default ButtonComponent