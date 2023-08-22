import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";


export interface YesNoDialogProps {
    message: string,
    open?: boolean,
    onYesClick?: VoidFunction,
    onNoClick?: VoidFunction,
}

const YesNoDialog = (props: YesNoDialogProps) => {
    const { open = false, message, onYesClick, onNoClick } = props;

    return (
        <Dialog
            open={open}
            onClose={onNoClick}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onNoClick}>No</Button>
                <Button onClick={onYesClick} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default YesNoDialog;