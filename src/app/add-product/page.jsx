"use client";
import React, { useEffect, useState } from "react";
import { Stack,Box, Typography, TextField, Button, MenuItem, RadioGroup, FormControl, 
  FormControlLabel, FormHelperText, Radio} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'; 
import styled from 'styled-components';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import axios from "axios";
import { useRouter } from "next/navigation";
import NavbarMain from "@/components/Navbar";
import {validateProductForm} from '../../../public/utils/signUpFormValidate';

const categoriesOfProduct = [
  'Electronics',
  'Clothing',
  'Home',
  'Health',
  'Sports',
  'Spiritual'
  ];

export default function AddProduct() {

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    productName:"",
    price:"",
    category:"",
    status:""
  });

  const router = useRouter();

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setProducts(prevState => ({ ...prevState, [name]: value }));
};

  const productSave = async () => {
    const validationErrors = validateProductForm(products);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        setLoading(true); 
        try {
            console.log("products",products)
            const response = await axios.post("/api/users/addproduct", products);
            console.log("Products Added successfully!", response.data);
            router.push('/dashboard');
        } catch (error) {
            console.error(error.message);
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
                  aria-current="page"
                  style={{ textDecoration: 'none', color:'black' }}>
                  Add Product
              </Link>
            </Breadcrumbs>
            <Typography sx={{fontWeight:'bold', fontSize:23}}>
                Product
            </Typography>
            <Typography sx={{fontWeight:'bold', fontSize:40}}>
                My Product
            </Typography>
        </Stack>
        <Box style={{ display: 'flex', justifyContent: 'center' }} marginTop={5}>
          <Stack width={500} spacing={2} direction="column">
              <Typography style={{ fontWeight: 'bold' }} variant="h5" noWrap component="div">
                  Add Products
              </Typography>
              <TextField 
                id="outlined-basic" 
                label="Product Name" 
                value={products.productName}
                onChange={(e) => setProducts({...products, productName: e.target.value})}
                error={errors.productName}
                helperText={errors.productName}
                variant="outlined" />
              <TextField 
                id="outlined-basic" 
                label="Price"
                type="number"
                value={products.price}
                onChange={(e) => setProducts({...products, price: e.target.value})}
                error={errors.price}
                helperText={errors.price} 
                variant="outlined" />
              <TextField 
                id="outlined-basic" 
                select
                value={products.category}
                onChange={(e) => setProducts({...products, category: e.target.value})}
                error={errors.category}
                helperText={errors.category}
                label="Select Category" 
                variant="outlined">
                {categoriesOfProduct.map((items) => (
                  <MenuItem key={items} value={items}>
                    {items}
                  </MenuItem>
                ))}
              </TextField>
              <FormControl error={!!errors.status}>
                  <RadioGroup
                      value={products.status}
                      onChange={handleSelectChange}
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Active"
                      name="status">
                      <FormControlLabel value="Active" control={<Radio />} label="Active" />
                      <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                  </RadioGroup>
                  {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
              </FormControl>
              <Stack direction="row" spacing={2}>
                  <SaveButton
                    onClick={productSave}
                    disabled={loading} 
                    sx={{width:250, height:60,fontWeight:'bold'}} 
                    variant="contained">
                      {loading ? <CircularProgress size={24} /> : "SAVE"}
                  </SaveButton>
                  <BackAccountButton onClick={() => router.push('/dashboard')} sx={{width:250, fontWeight:'bold'}} variant="text"><span>BACK TO MY ACCOUNT</span></BackAccountButton>
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

