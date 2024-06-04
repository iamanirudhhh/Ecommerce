"use client";
import React, { useState, useEffect } from "react";
import { Stack, Typography, TextField, Box, Radio, RadioGroup, FormControl, FormControlLabel, InputLabel, Select, 
        MenuItem,Button } from '@mui/material';
import styled from 'styled-components';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CircularProgress from '@mui/material/CircularProgress'; 
import Checkbox from '@mui/material/Checkbox';
import NavbarMain from "@/components/Navbar";
import axios from 'axios';
import {validateAddAddress} from '../../../../public/utils/signUpFormValidate';


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

export default function ProfilePage() {

    const [selectedState, setSelectedState] = useState('');
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [addressId, setAddressId] = useState("");
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = useState(false);
    
    const [userAddress, setUserAddress] = useState({
      _id:"",
      addressTitle: "",
      firstName: "",
      lastName: "",
      addressLine: "",
      city: "",
      pincode: "",
      state: "",
      mobileNo: "",
      byDefaultAddress: ""
    });

    const router = useRouter();

    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setAddressId(urlToken || "");
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
        if (addressId) {
            try {
                const response = await axios.post('/api/users/fetchaddressdata', { _id: addressId });
                console.log(response.data)
                setUserAddress({
                    _id: response.data._id, 
                    addressTitle: response.data.addressTitle,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    addressLine: response.data.addressLine,
                    city: response.data.city,
                    pincode: response.data.pincode,
                    state: response.data.state,
                    mobileNo: response.data.mobileNo,
                    byDefaultAddress: response.data.byDefaultAddress,
                });
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    fetchUserProfile();
}, [addressId]);


    const handleStateChange = (event) => {
      setSelectedState(event.target.value);
    };

    const handleSave = async () =>{
      const validationErrors = validateAddAddress(userAddress);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
          try {
              const response = await axios.post("/api/users/editaddress", userAddress);
              console.log("User Number Updated successfully!", response.data);
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
                    Edit Address
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
                    Edit Address{}
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
                      value={userAddress.firstName}
                      error={errors.firstName}
                      helperText={errors.firstName}
                      onChange={(e) => setUserAddress({...userAddress, firstName: e.target.value.replace(/\s/g, '')})} 
                      id="outlined-basic" 
                      label="First Name" 
                      variant="outlined" />  
                    <TextField 
                      sx={{width:'100%'}} 
                      id="outlined-basic"
                      value={userAddress.lastName}
                      error={errors.lastName}
                      helperText={errors.lastName}
                      onChange={(e) => setUserAddress({...userAddress, lastName: e.target.value.replace(/\s/g, '')})} 
                      label="Last Name" 
                      variant="outlined" />                  
                </Stack>
                <TextField 
                  id="outlined-basic" 
                  label="Address Line 1"
                  value={userAddress.addressLine} 
                  error={errors.addressLine}
                  helperText={errors.addressLine}
                  onChange={(e) => setUserAddress({...userAddress, addressLine: e.target.value})}
                  variant="outlined" />
                <Stack direction="row" spacing={2}>
                    <TextField 
                      sx={{width:'100%'}} 
                      id="outlined-basic" 
                      label="City" 
                      value={userAddress.city}
                      error={errors.city}
                      helperText={errors.city}
                      onChange={(e) => setUserAddress({...userAddress, city: e.target.value.replace(/\s/g, '')})} 
                      variant="outlined" />  
                    <TextField 
                      sx={{width:'100%'}} 
                      id="outlined-basic"
                      value={userAddress.pincode} 
                      error={errors.pincode}
                      helperText={errors.pincode}
                      onChange={(e) => setUserAddress({...userAddress, pincode: e.target.value.replace(/\s/g, '')})}
                      label="Pincode" 
                      variant="outlined" />      
                </Stack>
                <TextField
                  id="outlined-basic"
                  select
                  label="Select state"
                  variant="outlined"
                  value={userAddress.state}
                  error={errors.state}
                  helperText={errors.state}
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
                  type='number'
                  value={userAddress.mobileNo} 
                  error={errors.mobileNo}
                  helperText={errors.mobileNo}
                  onChange={(e) => setUserAddress({...userAddress, mobileNo: e.target.value.replace(/\s/g, '')})} 
                  variant="outlined" />   
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Checkbox 
                      {...label}
                    checked={userAddress.byDefaultAddress === "true"}
                    onChange={(e) => setUserAddress({...userAddress, byDefaultAddress: e.target.checked ? "true" : "false"})}
                    color="default" />         
                    <Typography style={{ alignItems:"center", fontSize:'1.0rem', fontFamily: 'Times New Roman' }} noWrap component="div"> Make Default</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <SaveButton disabled={loading} onClick={handleSave} sx={{width:250, height:60,fontWeight:'bold'}} variant="contained">
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
