"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress'; 
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import forgotImage from '../../../public/assets/forgotPassword.png';
import {validateChangePassword} from '../../../public/utils/signUpFormValidate';
import denied from '../../../public/assets/denied.png';

export default function ForgotPassword(){

    const [user,setUser] = React.useState({password:"",confirmPassword:"",tokenId:""});
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [showPasswordOne, setShowPasswordOne] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [notVerified, setNotVerified] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const verifyUserChangePassword = async () => {
            try {
                await axios.post('/api/users/changepassword', {token});
                setVerified(true);
                setUser({tokenId:token});
            } catch (error) {
                setNotVerified(true);
                console.log(error);
            }
        };

        if (token.length > 0) {
            verifyUserChangePassword();
        }
    }, [token]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);

    const handleMouseDownPasswordOne = (event) => {
        event.preventDefault();
    };

    const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

    const handleMouseDownPasswordTwo = (event) => {
        event.preventDefault();
    };

    const handlePopupClose = () => {
        setUser({password:"", confirmPassword:""});
        setOpenPopup(false);
        router.push('/login')
    };

    const changePassword = async () => {
        
        const validationErrors = validateChangePassword(user);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                setLoading(true);
                const response = await axios.post("/api/users/savepassword", user);
                console.log("Password changed successfully!", response.data);
                setOpenPopup(true);         
            } catch (error) {
                // toast.error(error.message);
                console.log(error.message)
            } 
            finally {
                setLoading(false); 
            }
        }
    }

    return(
            <>  
                {verified && (
                    <Grid container justifyContent="center" alignItems="center" height="100vh">
                        <Stack sx={{border: '1px solid  #f0f0f0', padding: '20px' , width:400, justifyContent:"center", alignItems:"center"}} direction="column" spacing={2}>
                            <Image src={forgotImage} alt="userLocked" style={{ height: '100px', width: '100px' }} />
                            <h2>Change Password</h2>
                            <TextField
                                onChange={(e) => setUser({...user, password: e.target.value.replace(/\s/g, '')})} 
                                value={user.password}
                                error={errors.password}
                                helperText={errors.password}
                                id="outlined-basic"
                                label="Password"
                                type={showPasswordOne ? 'text' : 'password'}
                                variant="outlined"
                                sx={{width:350}}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordOne}
                                            onMouseDown={handleMouseDownPasswordOne}
                                            edge="end"
                                            >
                                            {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField 
                                onChange={(e) => setUser({...user, confirmPassword: e.target.value.replace(/\s/g, '')})}
                                value={user.confirmPassword}
                                error={errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                id="outlined-basic"
                                label="Confirm Password"
                                type={showPasswordTwo ? 'text' : 'password'}
                                variant="outlined"
                                sx={{width:350}}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordTwo}
                                            onMouseDown={handleMouseDownPasswordTwo}
                                            edge="end"
                                            >
                                            {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                            />
                            <Button onClick={changePassword} sx={{width:350}} variant="contained" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : "Change Password"}
                            </Button>
                            <BootstrapDialog
                                open={openPopup}
                                onClose={handlePopupClose}
                                aria-labelledby="customized-dialog-title" 
                                >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <DialogTitle sx={{ m: 0, p: 2, flexGrow: 1 }} id="customized-dialog-title">
                                        Password changed Successfully!
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
                            </BootstrapDialog>
                            <Divider style={{width:350,marginTop:30}}>OR</Divider>
                            <Link href={'/signup'} style={{ color: 'black', marginTop: 30, textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none' }} className="custom-link" 
                                onMouseEnter={(e) => e.target.style.color = 'grey'}
                                onMouseLeave={(e) => e.target.style.color = 'black'}>
                                Create new account
                            </Link>
                            <Link href={'/login'} 
                                style={{color: 'black', textDecoration: 'none', cursor: 'pointer', textAlign: 'center',width:400, marginTop: 90, fontWeight: 'bold',
                                border: '1px solid #f0f0f0', 
                                padding: '20px',
                                marginBottom: -20,
                                background: 'linear-gradient(to bottom, #f9f9f9, #f0f0f0)'}} 
                                onMouseEnter={(e) => e.target.style.color = 'grey'}
                                onMouseLeave={(e) => e.target.style.color = 'black'}>
                                Back to login
                            </Link>

                        </Stack>
                    </Grid>
                )}
                {notVerified && (
                    <Grid container justifyContent="center" alignItems="center" height="100vh">
                    <Stack sx={{border: '1px solid  #f0f0f0', padding: '20px' , width:400, justifyContent:"center", alignItems:"center"}} direction="column" spacing={2}>
                        <Image src={denied} alt="userLocked" style={{ height: '100px', width: '100px' }} />
                        <h2>Error while changing your password</h2>
                        <Link href={'/login'} 
                            style={{color: 'black', textDecoration: 'none', cursor: 'pointer', textAlign: 'center',width:400, marginTop: 90, fontWeight: 'bold',
                            border: '1px solid #f0f0f0', 
                            padding: '20px',
                            marginBottom: -20,
                            background: 'linear-gradient(to bottom, #f9f9f9, #f0f0f0)'}} 
                            onMouseEnter={(e) => e.target.style.color = 'grey'}
                            onMouseLeave={(e) => e.target.style.color = 'black'}>
                            Back to login
                        </Link>

                    </Stack>
                </Grid>
                )}
            </>
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
