import React, { useState } from 'react';
import { connect } from "react-redux";
import { getUUID, uploadProfilePicture, signUpUser, LoginUser } from '../../../redux/signUp/signUp.action'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomButton from '../../../components/button/index';
import Input from '../../../components/input/index';
import ImageUpload from '../../../components/imageUpload/index';
import Grid from '@material-ui/core/Grid';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '../../../components/snackbar/index'
import { Notification } from "../../../utils/helpers";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: 140,
        height: 140,
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
        cursor: 'pointer'
    },
    cameraIcon: {
        fontSize: "3.2875rem"
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SignUp = (props) => {
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const handleSubmit = event => {
        event.preventDefault();
        props.getUUID(res => {
            if (res.flag) {
                //Assuming profile-picture.png would not be replaced instead would create a new file using uuid.
                props.uploadProfilePicture({
                    uuid: res.uuid,
                    filename: 'profile-picture.png',
                    filecontent: image
                }, resp => {
                    if (resp.flag) {
                        props.signUpUser({
                            uuid: res.uuid,
                            first_name: firstName,
                            last_name: lastName,
                            password: password
                        }, signupResponse => {
                            if (signupResponse.flag) {
                                Notification('success', 'Signed up successfully')
                                props.history.replace('/');
                            } else {
                                Notification('error', 'Some error occured while signing up')
                            }
                        })
                    } else {
                        Notification('error', 'Some error occured while uploading image')
                    }
                })
            } else {
                Notification('error', 'Some error occured while getting ID')
            }
        })
    }
    const openImageUploadModal = () => {
        setImage(null);
        setOpenUploadModal(true);
    }
    const classes = useStyles();
    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar src={image} className={classes.avatar} onClick={() => openImageUploadModal()}>
                        <CameraAltOutlinedIcon className={classes.cameraIcon} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={event => handleSubmit(event)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={event => setFirstName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={lastName}
                                    onChange={event => setLastName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    type="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <CustomButton
                            name="Sign Up"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        />
                    </form>
                </div>
            </Container>
            <ImageUpload openModal={openUploadModal} setOpenModal={setOpenUploadModal} setImage={setImage} />
            <Snackbar 
                open={notification.open}
                severity={notification.severity}
                setNotification={(value) => setNotification(value)}
            />
        </>
    )
}

const mapStateToProps = state => {
    return { SignUp: state.SignUp }
}

const mapDispatchToProps = ({
    getUUID,
    uploadProfilePicture,
    signUpUser,
    LoginUser
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);