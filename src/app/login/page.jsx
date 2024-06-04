"use client";
import Link from "next/link";
import React,{ useEffect } from "react";
import { useRouter } from "next/navigation";
// import { axios } from "axios";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress'; 
import { signIn, useSession } from "next-auth/react";
import Button from '@mui/material/Button';
import imgUi from '../../../public/assets/mainUi.jpg';
import googleImg from '../../../public/assets/google.png';
import {validateLoginForm} from '../../../public/utils/signUpFormValidate';

export default function LoginPage(){

    const [user,setUser] = React.useState({email:"",password:""});
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const onLogin = async () => {
        
        const validationErrors = validateLoginForm(user);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            const res = await signIn("credentials", {
                redirect: false,
                email: user.email,
                password: user.password,
            });
            console.log(res);

            if (res?.error) {
                setLoading(false);
                setErrors("Invalid email or password");
                return;
            } 

            router.push('/dashboard');
            setLoading(false);

        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <Grid container justifyContent="center" alignItems="center">
            <Image src={imgUi} alt="Main UI" style={{ marginLeft: '20px', height: '650px', width: 'auto' }} />
            <Stack sx={{width:350}} direction="column" spacing={2}>
                <h1 style={{textAlign: 'center'}}> Dot Store</h1>
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
                <Button onClick={onLogin} variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Log In"}
                </Button>
                <Divider style={{marginTop:30}}>OR</Divider>
                <Stack style={{marginTop:30}} justifyContent="center" alignItems="center" direction="row" spacing={2}>
                    <Image src={googleImg} alt="Main UI" style={{ height: '20px', width: '20px' }} />
                    <p style={{color:'#385185', fontWeight:'bold'}}>Log in with Google</p>
                </Stack>
                <Link href={'/forgotPassword'} style={{marginTop:30, color:'#385185', textAlign:'center', cursor:'pointer', textDecoration:'none'}}>
                    Forgot password?
                </Link>
                <p style={{marginTop:50,textAlign: 'center'}}>Don&apos;t have an account?  
                    <Link href={'/signup'} style={{color:'#0a7cff', cursor:'pointer', fontWeight:'bold',textDecoration:'none'}}>
                        Sign up
                    </Link>
                </p>            
            </Stack>
        </Grid>
    )
}


