"use client";
import React, { useState,useEffect } from "react";
import { Stack, Typography, TextField, Button, IconButton, InputAdornment,Box} from '@mui/material';
import styled from 'styled-components';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress'; 
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NavbarMain from "@/components/Navbar";
import {validateEditPasswordAccount} from '../../../../public/utils/signUpFormValidate';


export default function PasswordPage() {

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const [userProfile, setUserProfile] = useState({
      userId:"",
      currentPassword:"",
      newPassword:"",
      confirmPassword:""
    });


    useEffect(() => {
      if(session && session.user){
        setUserProfile({
            userId: session.user.id || "",
          })
      }
  }, [session]);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSaveClick = async () =>{
      const validationErrors = validateEditPasswordAccount(userProfile);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
          try {
              setLoading(true);
              console.log(userProfile)
              const response = await axios.post("/api/users/changepasswordaccount", userProfile );
              console.log("User Password Updated successfully!", response.data);
              router.push('/account');
          } catch (error) {
              console.log(error.message)
          }finally {
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
                    Password
                </Link>
            </Breadcrumbs>
            <Typography sx={{fontWeight:'bold', fontSize:23}}>
                Profile
            </Typography>
            <Typography sx={{fontWeight:'bold', fontSize:40}}>
                My Account
            </Typography>
        </Stack>
        <Box style={{ display: 'flex', justifyContent: 'center' }} marginTop={5}>
          <Stack width={500} spacing={2} direction="column">
              <Typography style={{ fontWeight: 'bold' }} variant="h5" noWrap component="div">
                  Change Password 
              </Typography>
              <TextField 
                      id="outlined-basic"
                      onChange={(e) => setUserProfile({...userProfile, currentPassword: e.target.value.replace(/\s/g, '')})}
                      value={userProfile.currentPassword}
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      error={errors.currentPassword}
                      helperText={errors.currentPassword} 
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
              <TextField 
                      id="outlined-basic"
                      onChange={(e) => setUserProfile({...userProfile, newPassword: e.target.value.replace(/\s/g, '')})}
                      value={userProfile.newPassword}
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      error={errors.newPassword}
                      helperText={errors.newPassword} 
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
              <TextField 
                      id="outlined-basic"
                      onChange={(e) => setUserProfile({...userProfile, confirmPassword: e.target.value.replace(/\s/g, '')})}
                      value={userProfile.confirmPassword}
                      label="Confirm New Password"
                      type={showPassword ? 'text' : 'password'}
                      error={errors.confirmPassword}
                      helperText={errors.confirmPassword} 
                      variant="outlined"
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
              <Stack direction="row" spacing={2}>
                  <SaveButton onClick={handleSaveClick} sx={{width:250, height:60,fontWeight:'bold'}} variant="contained" disabled={loading}>
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
