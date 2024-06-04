"use client";
import React, { useState,useEffect } from "react";
import { Stack, Typography, TextField, Box, Radio, RadioGroup, FormControl, FormControlLabel, InputLabel, Select, 
        MenuItem,Button, 
        Alert} from '@mui/material';
import styled from 'styled-components';
import axios  from "axios";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress'; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Checkbox from '@mui/material/Checkbox';
import NavbarMain from "@/components/Navbar";
import {validateAddAddress} from '../../../../public/utils/signUpFormValidate';

export default function ProfilePage() {

    const statesOfIndia = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry'
    ];

    const [selectedState, setSelectedState] = useState('');
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = useState(false);
    
    const [userAddress, setUserAddress] = useState({
      userId:"",
      addressTitle: "",
      firstName: "",
      lastName: "",
      addressLine: "",
      city: "",
      pincode: "",
      state: statesOfIndia[0],
      mobileNo: "",
      byDefaultAddress: "false"
    });

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(()=>{
      if(session && session.user){
        setUserAddress({
          userId: session.user.id || ""
        })
      }
    },[session])

  const handleStateChange = (event) => {
      setSelectedState(event.target.value);
      setUserAddress({ ...userAddress, state: event.target.value });
  };

  const handleSubmit = async () => {
    const validationErrors = validateAddAddress(userAddress);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
          setLoading(true);
          const response = await axios.post("/api/users/addaddress", userAddress);
          console.log("User Number Updated successfully!", response.data);
          router.push('/account');
      } catch (error) {
          console.log(error.message)
      } finally {
          setLoading(false); 
      }
    }
  };

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
                      Add Address
                  </Link>
                </Breadcrumbs>
                <Typography sx={{fontWeight:'bold', fontSize:23}}>
                    Address Book
                </Typography>
                <Typography sx={{fontWeight:'bold', fontSize:40}}>
                    My Account
                </Typography>
            </Stack>
            <Box style={{ display: 'flex', justifyContent: 'center' }} marginTop={5}>
              <Stack width={500} spacing={2} direction="column" >
                  <Typography style={{ fontWeight: 'bold' }} variant="h5" noWrap component="div">
                      New Address
                  </Typography>
                  <TextField 
                    id="outlined-basic" 
                    label="Address title"
                    value={userAddress.addressTitle}
                    onChange={(e) => setUserAddress({...userAddress, addressTitle: e.target.value})}
                    error={errors.addressTitle}
                    helperText={errors.addressTitle}
                    variant="outlined" />
                  <Stack direction="row" spacing={2}>
                      <TextField 
                        sx={{width:'100%'}} 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined"
                        error={errors.firstName}
                        helperText={errors.firstName}
                        value={userAddress.firstName}
                        onChange={(e) => setUserAddress({...userAddress, firstName: e.target.value.replace(/\s/g, '')})} />  
                      <TextField 
                        sx={{width:'100%'}} 
                        id="outlined-basic" 
                        label="Last Name" 
                        variant="outlined"
                        error={errors.lastName}
                        helperText={errors.lastName}
                        value={userAddress.lastName}
                        onChange={(e) => setUserAddress({...userAddress, lastName: e.target.value.replace(/\s/g, '')})}/>                  
                  </Stack>
                  <TextField 
                    id="outlined-basic" 
                    label="Address Line 1" 
                    variant="outlined" 
                    value={userAddress.addressLine}
                    error={errors.addressLine}
                    helperText={errors.addressLine}
                    onChange={(e) => setUserAddress({...userAddress, addressLine: e.target.value})}/>                  
                  <Stack direction="row" spacing={2}>
                      <TextField 
                        sx={{width:'100%'}} 
                        id="outlined-basic"
                        value={userAddress.city}
                        error={errors.city}
                        helperText={errors.city}
                        onChange={(e) => setUserAddress({...userAddress, city: e.target.value.replace(/\s/g, '')})} 
                        label="City" variant="outlined" />  
                      <TextField 
                        sx={{width:'100%'}} 
                        id="outlined-basic" 
                        label="Pincode"
                        value={userAddress.pincode}
                        error={errors.pincode}
                        helperText={errors.pincode}
                        type="number"
                        onChange={(e) => setUserAddress({...userAddress, pincode: e.target.value.replace(/\s/g, '')})}
                        variant="outlined" />      
                  </Stack>
                  <TextField
                    id="outlined-basic"
                    select
                    label="Select state"
                    variant="outlined"
                    error={errors.state}
                    helperText={errors.state}
                    value={userAddress.state}
                    onChange={(e) => setUserAddress({...userAddress, state: e.target.value})}

                    fullWidth
                    >
                    {statesOfIndia.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>         
                  <TextField 
                    id="outlined-basic" 
                    label="Phone number" 
                    value={userAddress.mobileNo}
                    error={errors.mobileNo}
                    helperText={errors.mobileNo}
                    onChange={(e) => setUserAddress({...userAddress, mobileNo: e.target.value.replace(/\s/g, '')})} 
                    type='number' 
                    variant="outlined" />   
                  <Stack direction="row" alignItems="center" spacing={2}>
                  <Checkbox 
                    {...label} 
                    color="default"
                    name="makeDefault"
                    checked={userAddress.byDefaultAddress}
                    onChange={(e) => setUserAddress({...userAddress, byDefaultAddress: e.target.checked})} /> 
                  <Typography 
                    style={{ alignItems:"center", fontSize:'1.0rem', fontFamily: 'Times New Roman' }} noWrap component="div"> 
                    Make Default
                  </Typography>
                </Stack>
                  <Stack direction="row" spacing={2}>
                      <SaveButton
                        onClick={handleSubmit} 
                        sx={{width:250, height:60,fontWeight:'bold'}}
                        disabled={loading}
                        variant="contained">
                          {loading ? <CircularProgress size={24} /> : "SAVE"}
                      </SaveButton>
                      <BackAccountButton onClick={() => router.push('/account')} sx={{width:250, fontWeight:'bold'}} variant="text">
                        <span>
                          BACK TO MY ACCOUNT
                        </span>
                      </BackAccountButton>
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
