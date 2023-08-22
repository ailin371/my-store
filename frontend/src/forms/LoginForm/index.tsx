import { Box, TextField, FormControlLabel, Checkbox, Button, Grid, Link, SxProps, Theme, Alert, Snackbar } from "@mui/material";
import { useLoginUserMutation } from "../../app/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { setUser } from "../../app/features/user/userSlice";
import { useState } from "react";
import { ApiResponse } from "../../app/models";

export interface LoginFormProps {
    sx?: SxProps<Theme>,
}

const USERNAME = 'username';
const PASSWORD = 'password';

const LoginForm = (props: LoginFormProps) => {
    const { sx } = props;

    const [loginUser] = useLoginUserMutation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        try {
            const user = await loginUser({
                username: data.get(USERNAME) as string,
                password: data.get(PASSWORD) as string,
            }).unwrap();

            dispatch(setUser(user));
            navigate('/products');
        }
        catch (error) {
            if (error && typeof error === 'object') {
                const typedError = error as ApiResponse<Record<string, string[]>>;
                const data = typedError.data;

                // show the first error
                for (const key in data) {
                    for (const msg of data[key]) {
                        setErrorMessage(msg);
                        break;
                    }
                    break;
                }
            }
            else {
                setErrorMessage("Login failed!");
            }
        }
    };

    const handleCloseError = () => setErrorMessage('');

    return (
        <>
            <Box component="form" onSubmit={onSubmit} noValidate sx={sx}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={USERNAME}
                    label="Username"
                    name={USERNAME}
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name={PASSWORD}
                    label="Password"
                    type="password"
                    id={PASSWORD}
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="register" variant="body2">
                            Don't have an account? Register
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
        </>
    );
};

export default LoginForm;