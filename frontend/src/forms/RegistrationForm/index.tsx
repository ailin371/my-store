import { Box, Grid, TextField, Button, Link, SxProps, Theme, Snackbar, Alert } from "@mui/material";
import { useRegisterUserMutation } from "../../app/api";
import { useState } from "react";
import { UserRegistrationRequest } from "../../app/models";
import { useNavigate } from "react-router-dom";


export interface RegistrationFormProps {
    sx?: SxProps<Theme>,
}

const EMAIL = 'email';
const FIRSTNAME = 'first_name';
const LASTNAME = 'last_name';
const USERNAME = 'username';
const PASSWORD = 'password';

const RegistrationForm = (props: RegistrationFormProps) => {
    const { sx } = props;

    const [user, setUser] = useState<UserRegistrationRequest>({ email: "", username: "", password: "", first_name: "", last_name: "" });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await registerUser(user).unwrap();

            setRegistrationSuccess(true);
            setTimeout(() => navigate("/login"), 1000);
        }
        catch (error) {
            if (error && typeof error === 'object' && 'data' in error &&
                error.data && typeof error.data === 'object' && 'data' in error.data &&
                error.data.data
            ) {
                Object.entries(error.data.data).forEach(([key, errorData]: [string, string[]]) => {
                    errorData.forEach((errorMessage: string) => {
                        setErrorMessage(`${key}: ${errorMessage}`);
                    });
                });
            }
            else {
                setErrorMessage('Registration failed! maybe try another username...');
            }
        }
    };

    const handleCloseError = () => setErrorMessage('');

    return (
        <>
            <Box component="form" noValidate onSubmit={onSubmit} sx={sx}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name={FIRSTNAME}
                            required
                            fullWidth
                            id={FIRSTNAME}
                            label="First Name"
                            autoFocus
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id={LASTNAME}
                            label="Last Name"
                            name={LASTNAME}
                            autoComplete="family-name"
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id={EMAIL}
                            label="Email Address"
                            name={EMAIL}
                            autoComplete="email"
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id={USERNAME}
                            label="Username"
                            name={USERNAME}
                            autoComplete="username"
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name={PASSWORD}
                            label="Password"
                            type="password"
                            id={PASSWORD}
                            autoComplete="new-password"
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="login" variant="body2">
                            Already have an account? Login
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={errorMessage.length > 0}
                autoHideDuration={3000}
                onClose={handleCloseError}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={registrationSuccess}
                autoHideDuration={3000}
                onClose={() => setRegistrationSuccess(false)}
            >
                <Alert severity="success">Registered your user successfully!</Alert>
            </Snackbar>
        </>
    );
};

export default RegistrationForm;