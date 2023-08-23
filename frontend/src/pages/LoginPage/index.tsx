import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginForm from '../../forms/LoginForm';
import { useAppSelector } from '../../app/store';
import { selectUser } from '../../app/features/user/userSelectors';
import { Navigate } from 'react-router-dom';


const LoginPage = () => {
    const user = useAppSelector(selectUser);

    if (user.token.length > 0) return <Navigate to='/products' />;

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <LoginForm sx={{ mt: 1 }} />
            </Box>
        </Container>
    );
};

export default LoginPage;