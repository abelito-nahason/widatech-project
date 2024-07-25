import styles from './index.module.css'

type ButtonComponentProps = {
    stackedStyles: CSSModuleClasses[string]
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ButtonComponent = ({stackedStyles, ...props}:ButtonComponentProps) => {

    return (
        <button className={`${stackedStyles} ${styles.button}`} {...props}>
            Submit
        </button>
    )
}

export default ButtonComponent