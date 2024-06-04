"use client";
import React, { useEffect, useState } from "react";
import { Stack,Box, Typography, TextField, Button} from '@mui/material';
import { useSession } from "next-auth/react";
import styled from 'styled-components';
import axios  from "axios";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress'; 
import { useRouter } from "next/navigation";
import NavbarMain from "@/components/Navbar";
import {validateMobileNo} from '../../../../public/utils/signUpFormValidate';

export default function PasswordPage() {

  const [userProfile, setUserProfile] = useState({
    userId:"",
    mobileNo:""
  })
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = useState(false);


  const router = useRouter();
  const { data: session } = useSession();
  

  useEffect(()=>{
    if(session && session.user){
      setUserProfile({
        userId: session.user.id || ""
      })
    }
  },[session])

  const handleSave = async () => {
    const validationErrors = validateMobileNo(userProfile);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
          setLoading(true);
            const response = await axios.post("/api/users/changenumber", userProfile);
            console.log("User Number Updated successfully!", response.data);
            router.push('/account');
      } catch (error) {
          // toast.error(error.message);
          console.log(error.message)
      } finally {
          setLoading(false); 
      }
    }
  }

  function handleBreadcrumbClick(event) {
    event.preventDefault();
  }

    return (
      <>
        <NavbarMain/>
        <Stack 
            sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '900px', marginTop: '100px' }} 
            direction="column" 
            spacing={2} 
            role="presentation" 
            onClick={handleBreadcrumbClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link 
                    color="inherit"
                    style={{ textDecoration: 'none', fontWeight: 'bold', color:'black', cursor:'pointer' }}  
                    onClick={() => router.push("/dashboard")}>
                    Home
                </Link>
                <Link 
                    color="inherit"
                    style={{ textDecoration: 'none', fontWeight: 'bold', color:'black', cursor:'pointer' }}  
                    onClick={() => router.push("/account")}>
                    My Account
                </Link>
                <Link 
                    aria-current="page"
                    style={{ textDecoration: 'none', color:'black' }}>
                    Phone Number
                </Link>
            </Breadcrumbs>
            <Typography sx={{fontWeight:'bold', fontSize:23}}>
                Phone Number
            </Typography>
            <Typography sx={{fontWeight:'bold', fontSize:40}}>
                My Account
            </Typography>
        </Stack>
        <Box style={{ display: 'flex', justifyContent: 'center' }} marginTop={5}>
          <Stack width={500} spacing={2} direction="column">
              <Typography style={{ fontWeight: 'bold' }} variant="h5" noWrap component="div">
                  Change phone number
              </Typography>
              <TextField 
                onChange={(e) => setUserProfile({...userProfile, mobileNo: e.target.value.replace(/\s/g, '')})}
                value={userProfile.mobileNo} 
                id="outlined-basic" 
                type="number" 
                label="Phone" 
                error={errors.mobileNo}
                helperText={errors.mobileNo}
                variant="outlined" />
              <Stack direction="row" spacing={2}>
                  <SaveButton 
                    onClick={handleSave}  
                    sx={{width:250, height:60,fontWeight:'bold'}} 
                    disabled={loading}
                    variant="contained">
                      {loading ? <CircularProgress size={24} /> : "SAVE"}
                  </SaveButton>
                  <BackAccountButton onClick={() => router.push('/account')} sx={{width:250, fontWeight:'bold'}} variant="text"><span>BACK TO MY ACCOUNT</span></BackAccountButton>
              </Stack>
          </Stack>
        </Box>
      </>
    )
}

const SaveButton = styled(Button)`
  && {
    width: 250px;
    height: 60px;
    background-color: black;
    color: white;

    &:hover {
      background-color: #424242; 
    }
  }
`;

const BackAccountButton = styled(Button)`
  && {
    width: 250px;
    height: 60px;
    color: black;
    position: relative;

    span {
      position: relative;
    }

    span::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #bdbdbd; 
      transition: background-color 0.3s ease;
    }

    &:hover span::after {
      background-color: black;
    }

    &:hover {
      background-color: white; 
    }
  }
`;
