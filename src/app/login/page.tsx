"use client"

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Button from '@mui/material/Button';
import imgUi from '../../../public/assets/mainUi.jpg';

export default function LoginPage(){
    return(
        <Grid container justifyContent="center" alignItems="center">
            <Image src={imgUi} alt="Main UI" style={{ marginLeft: '20px', height: '650px', width: 'auto' }} />
            <Stack sx={{width:350}} direction="column" spacing={2}>
                <h1 style={{textAlign: 'center'}}> Dot Store</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" />
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" />
                <Button variant="contained">Log In</Button>
                <p style={{marginTop:30,textAlign: 'center'}}>Dont have an account? <Link href={'/signup'} style={{color:'#0a7cff', cursor:'pointer', fontWeight:'bold'}}>Sign up</Link></p>            
            </Stack>
        </Grid>
    )
}
