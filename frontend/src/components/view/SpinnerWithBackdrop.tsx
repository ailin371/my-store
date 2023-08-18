import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

export interface SpinnerWithBackdropProps {
    open: boolean;
}

const SpinnerWithBackdrop: React.FC<SpinnerWithBackdropProps> = ({ open }) => {
    return (
        <Backdrop
            open={open}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default SpinnerWithBackdrop;
