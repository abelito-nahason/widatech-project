import { JSXElementConstructor, ReactElement } from "react"
import styles from './index.module.css'


type PaperComponentProps = {
    children: ReactElement<any, string | JSXElementConstructor<any>>
    stackStyles?: CSSModuleClasses[string]
}

const PaperComponent = ({children, stackStyles}:PaperComponentProps) => {

    return (
        <div className={`${styles.container} ${stackStyles}`}>
            {children}
        </div>
    )

}


export default PaperComponent