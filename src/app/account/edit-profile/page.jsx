"use client";
import React, { useState, useEffect } from "react";
import { Stack, Typography, TextField, Radio,Box, RadioGroup, FormControl, FormControlLabel, InputLabel, Select, 
        MenuItem,Button, FormHelperText } from '@mui/material';
import styled from 'styled-components';
import axios from "axios";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress'; 
import NavbarMain from "@/components/Navbar";
import {validateEditProfile} from '../../../../public/utils/signUpFormValidate';

export default function ProfilePage() { 

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = useState(false);

    const [userProfile, setUserProfile] = useState({
        userId:"",
        firstName:"",
        lastName:"",
        email:"",
        gender: ""
    });

    const [userId , setUserId] = useState({
        id:'',
    });

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.post('/api/users/fetchprofile', { _id:userId.id });
                setUserProfile({
                    userId: userId.id,
                    firstName:response.data.firstName,
                    lastName:response.data.lastName,
                    email:response.data.email,
                    gender:response.data.gender
                });
            } catch (error) {
                console.log(error.message);
            } 
        };

        fetchUserProfile();
    }, [userId.id]);

    useEffect(()=>{
        if(session && session.user){
            setUserId({
                id:session.user.id || "",
            })

        }
    },[session])


    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setUserProfile(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveClick = async () =>{
        const validationErrors = validateEditProfile(userProfile);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            try {
                setLoading(true);
                const response = await axios.post("/api/users/editprofile", userProfile );
                console.log("User Updated successfully!", response.data);

                await signIn('credentials', {
                    redirect: false,
                    email: userProfile.email,
                    firstName: userProfile.firstName
                });

                
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
                        Profile
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
                        Edit Profile 
                    </Typography>
                    <TextField 
                        onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value.replace(/\s/g, '')})}
                        value={userProfile.firstName}
                        id="outlined-basic" 
                        label="First Name"
                        error={errors.firstName}
                        helperText={errors.firstName} 
                        variant="outlined" />
                    <TextField 
                        onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value.replace(/\s/g, '')})}
                        value={userProfile.lastName}
                        id="outlined-basic" 
                        label="Last Name" 
                        error={errors.lastName}
                        helperText={errors.lastName}
                        variant="outlined" />
                    <FormControl error={!!errors.gender}>
                        <RadioGroup
                            value={userProfile.gender}
                            onChange={handleSelectChange}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="male"
                            name="gender">
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>
                    <TextField
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value.replace(/\s/g, '')})}
                        value={userProfile.email}
                        id="outlined-basic" 
                        label="Email"
                        error={errors.email}
                        helperText={errors.email} 
                        variant="outlined" />
                    <Stack direction="row" spacing={2}>
                        <SaveButton onClick={handleSaveClick} disabled={loading} sx={{width:250, height:60,fontWeight:'bold'}} variant="contained">
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
