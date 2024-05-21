"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Button from '@mui/material/Button';
import imgUi from '../../../public/assets/mainUi.jpg';

export default function SignupPage(){

    const [user,setUser] = React.useState({name:"",username:"",mobileNo:"",password:""});
    
    const onSignup = async () => {}

    return(
        <Grid container justifyContent="center" alignItems="center">
            <Image src={imgUi} alt="Main UI" style={{ marginLeft: '20px', height: '650px', width: 'auto' }} />
            <Stack sx={{width:350}} direction="column" spacing={2}>
                <h1 style={{textAlign: 'center'}}> Dot Store</h1>
                <p style={{textAlign: 'center'}}>Sign up to see different products and shop</p>
                <TextField onChange={(e) => setUser({...user, name: e.target.value})} value={user.name} id="outlined-basic" label="Full Name" variant="outlined" />
                <TextField onChange={(e) => setUser({...user, username: e.target.value})} value={user.username} id="outlined-basic" label="Username" variant="outlined" />
                <TextField onChange={(e) => setUser({...user, mobileNo: e.target.value})} value={user.mobileNo} id="outlined-basic" label="Mobile Number" type="number" variant="outlined" />
                <TextField onChange={(e) => setUser({...user, password: e.target.value})} value={user.password} id="outlined-basic" label="Password" type="password" variant="outlined" />
                <Button onClick={onSignup} variant="contained">Sign Up</Button>
                <p style={{marginTop:30,textAlign: 'center'}}>Have an account? <Link href={'/login'} style={{color:'#0a7cff', cursor:'pointer', fontWeight:'bold'}}>Log in</Link></p>
            </Stack>
        </Grid>
    )
}
