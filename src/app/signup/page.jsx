"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DialogTitle from '@mui/material/DialogTitle';
import imgUi from '../../../public/assets/mainUi.jpg';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {validateSignupForm} from '../../../public/utils/signUpFormValidate';
import { styled } from '@mui/material/styles';


export default function SignupPage(){

    const [user,setUser] = React.useState({firstName:"", lastName:"", email:"", mobileNo:"", password:""});
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();


    const handlePopupClose = () => {
        setUser({firstName:"", lastName:"", email:"", mobileNo:"", password:""});
        setOpenPopup(false);
        router.push('/login')
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const onSignup = async () => {
        const validationErrors = validateSignupForm(user);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            try {
                setLoading(true);
                const response = await axios.post("/api/users/signup", user);
                console.log("User Signup successfully!", response.data);
                setOpenPopup(true);
                
            } catch (error) {
                // toast.error(error.message);
                console.log(error.message)
            } finally {
                setLoading(false); 
            }
        }
    }

    return(
        <Grid container justifyContent="center" alignItems="center">
            <Image src={imgUi} alt="Main UI" style={{ marginLeft: '20px', height: '650px', width: 'auto' }} />
            <Stack sx={{width:350}} direction="column" spacing={2}>
                <h1 style={{textAlign: 'center'}}> Dot Store</h1>
                <p style={{textAlign: 'center'}}>Sign up to see different products and shop</p>
                <TextField 
                    onChange={(e) => setUser({...user, firstName: e.target.value.replace(/\s/g, '')})}
                    value={user.firstName}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    error={errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField 
                    onChange={(e) => setUser({...user, lastName: e.target.value.replace(/\s/g, '')})}
                    value={user.lastName}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    error={errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField 
                    onChange={(e) => setUser({...user, email: e.target.value.replace(/\s/g, '')})}
                    value={user.email}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    error={errors.email}
                    helperText={errors.email}
                />
                <TextField 
                    onChange={(e) => setUser({...user, mobileNo: e.target.value.replace(/\s/g, '')})}
                    value={user.mobileNo}
                    id="outlined-basic"
                    label="Mobile Number"
                    type="number"
                    variant="outlined"
                    error={errors.mobileNo}
                    helperText={errors.mobileNo}
                />
                <TextField 
                    onChange={(e) => setUser({...user, password: e.target.value.replace(/\s/g, '')})}
                    value={user.password}
                    id="outlined-basic"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    error={errors.password}
                    helperText={errors.password}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
                <Button onClick={onSignup} variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Sign Up"}
                </Button>
                <BootstrapDialog
                    open={openPopup}
                    onClose={handlePopupClose}
                    aria-labelledby="customized-dialog-title" 
                    >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <DialogTitle sx={{ m: 0, p: 2, flexGrow: 1 }} id="customized-dialog-title">
                            Registration Done Successfully!
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handlePopupClose}
                            sx={{
                                marginLeft: 'auto',
                                right: 8,
                                color: "black",
                            }}
                            >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Link has been sent to <span style={{ fontWeight: 'bold' }}>{user.email}</span>
                        </Typography>
                        <Typography gutterBottom>
                            Before Login verify your E-mail.
                        </Typography>
                    </DialogContent>
                </BootstrapDialog>
                <p style={{marginTop:30,textAlign: 'center'}}>Have an account? 
                    <Link href={'/login'} style={{color:'#0a7cff', cursor:'pointer', fontWeight:'bold', textDecoration: 'none'}}>
                        Log in
                    </Link>
                </p>
            </Stack>
        </Grid>
    )
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

