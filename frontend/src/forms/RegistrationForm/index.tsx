import { Box, Grid, TextField, Button, Link, SxProps, Theme } from "@mui/material";


export interface RegistrationFormProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
    sx?: SxProps<Theme>,
}

const RegistrationForm = (props: RegistrationFormProps) => {
    const { onSubmit, sx } = props;

    return (
        <Box component="form" noValidate onSubmit={onSubmit} sx={sx}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
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
    );
};

export default RegistrationForm;