import React, { JSXElementConstructor, ReactElement } from "react"
import PaperComponent from "../PaperComponent"
import styles from './index.module.css'
import { pagesList } from "../../App"
import { useLocation, useNavigate } from "react-router-dom"

type PagePresetProps = {
    children: ReactElement<any, string | JSXElementConstructor<any>>
}

const PagePresetComponent = ({children}:PagePresetProps) => {
    const currentPage = useLocation()
    const navigate = useNavigate()
    return (
        <div className={styles.page}>
            <PaperComponent stackStyles={styles.form}>
                <>  
                    <div className={styles.navigator}>
                        {pagesList.map((page, index) => (
                            <React.Fragment key={page.path}>
                                <span onClick={()=> navigate(page.path)} className={styles['navigator-pages']} aria-disabled={currentPage.pathname === page.path}>{page.name}</span>
                                { index !== pagesList.length - 1 ? <span>|</span> : undefined}                            
                            </React.Fragment>
                        ))}
                    </div>
                    {children}
                </>
            </PaperComponent>
        </div>

    )
}

export default PagePresetComponent