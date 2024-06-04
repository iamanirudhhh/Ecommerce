"use client";
import Link from "next/link";
import React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import denied from '../../../public/assets/denied.png';

export default function accessDenied(){

    return(
        <>  
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <Stack sx={{border: '1px solid  #f0f0f0', padding: '20px' , width:400, justifyContent:"center", alignItems:"center"}} direction="column" spacing={2}>
                    <Image src={denied} alt="userLocked" style={{ height: '100px', width: '100px' }} />
                    <h2>To access this first login.</h2>
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
        </>
    )
}
