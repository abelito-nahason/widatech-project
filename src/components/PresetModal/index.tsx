import { Box, Modal } from "@mui/material";
import { JSXElementConstructor, ReactElement } from "react";

type PresetModalProps = {
    open:boolean;
    onClose: ()=> void;
    children: ReactElement<any, string | JSXElementConstructor<any>>
}

const PresetModal = ({open, onClose, children}:PresetModalProps) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        border: '1px solid',
        borderRadius: '20px',
        backgroundColor:'white',
        boxShadow: 24,
        p: 4,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )

}

export default PresetModal