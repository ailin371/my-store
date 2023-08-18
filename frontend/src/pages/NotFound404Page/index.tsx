import React from 'react';
import { Typography, Paper } from '@mui/material';

const NotFound404Page: React.FC = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                backgroundColor: theme => theme.palette.grey[100]
            }}
        >
            <Typography variant="h1" color="textSecondary" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom sx={{ textAlign: 'center' }}>
                Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                Sorry, the page you're looking for doesn't exist.
            </Typography>
        </Paper>
    );
}

export default NotFound404Page;
