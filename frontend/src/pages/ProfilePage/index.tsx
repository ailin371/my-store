import { Box, Typography, Button, CircularProgress, Avatar, Grid, Paper, Divider, Alert, Snackbar } from "@mui/material";
import { selectUser } from "../../app/features/user/userSelectors";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useUpdateProfilePictureMutation } from "../../app/api";
import { BASE_URL } from "../../app/constants";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { setUser } from "../../app/features/user/userSlice";
import { useState } from "react";


const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const { image } = user;
    const [updateProfilePicture, { isLoading }] = useUpdateProfilePictureMutation();
    const [openUploadImageSuccess, setOpenUploadImageSuccess] = useState(false);
    const [openUploadImageFail, setOpenUploadImageFail] = useState(false);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            updateProfilePicture(file)
                .unwrap()
                .then((response) => {
                    dispatch(setUser({
                        ...user,
                        ...response,
                    }));
                    setOpenUploadImageSuccess(true);
                })
                .catch((_error) => setOpenUploadImageFail(true));
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Profile Page</Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper elevation={2}>
                        <Grid container>
                            <Grid item xs={4}>
                                {image && (
                                    <Avatar
                                        src={`${BASE_URL}/${image}`}
                                        alt="Profile"
                                        sx={{ width: 150, height: 150, margin: 'auto', marginTop: 2 }} />
                                )}
                                <Box display="flex" justifyContent="center" p={1}>
                                    <Button variant="contained" component="label" disabled={isLoading}>
                                        Upload File
                                        <input
                                            id="contained-button-file"
                                            accept="image/*"
                                            type="file"
                                            hidden
                                            onChange={handleImageUpload} />
                                        <Divider orientation="vertical" sx={{ mx: 1, color: 'white' }} />
                                        <FileUploadOutlinedIcon />
                                        {isLoading && <CircularProgress size={24} />}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h5">User Details</Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
                                <Typography variant="body1"><b>Username:</b> {user.username}</Typography>
                                <Typography variant="body1"><b>First Name:</b> {user.firstName}</Typography>
                                <Typography variant="body1"><b>Last Name:</b> {user.lastName}</Typography>
                                <Typography variant="body1"><b>ID:</b> {user.id}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
                open={openUploadImageSuccess}
                autoHideDuration={3000}
                onClose={() => setOpenUploadImageSuccess(false)}
            >
                <Alert severity="success">Profile image has been successfully uploaded!</Alert>
            </Snackbar>
            <Snackbar
                open={openUploadImageFail}
                autoHideDuration={3000}
                onClose={() => setOpenUploadImageFail(false)}
            >
                <Alert severity="error">Failed to upload the profile image, please try again later...</Alert>
            </Snackbar>
        </Box>
    );
};

export default ProfilePage;