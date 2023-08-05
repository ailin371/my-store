import { Box, TextField, FormControlLabel, Checkbox, Button, Grid, Link, SxProps, Theme } from "@mui/material";

export interface LoginFormProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
    sx?: SxProps<Theme>,
}

const LoginForm = (props: LoginFormProps) => {
    const { onSubmit, sx } = props;

    return (
        <Box component="form" onSubmit={onSubmit} noValidate sx={sx}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
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
    );
};

export default LoginForm;