"use client";
import React,{useState,useEffect} from "react";
import { Stack, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, MenuItem, TextField } from '@mui/material';
import styled from 'styled-components';
import SortIcon from '@mui/icons-material/Sort';
import axios from "axios";
import { useRouter } from "next/navigation";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import NavbarMain from "@/components/Navbar";

export default function Products() {

  const [products, setProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get('/api/users/fetchProduct')
      .then(response => {
        console.log(response.data.products)
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  function handleBreadcrumbClick(event) {
    event.preventDefault();
  }

  return (
    <>
      <NavbarMain />
      <Stack 
          sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1200px', marginTop: '100px' }} 
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
                Products
            </Link>
          </Breadcrumbs>
          <Typography sx={{fontWeight:'bold', fontSize:23}}>
              Product
          </Typography>
          <Typography sx={{fontWeight:'bold', fontSize:40}}>
              My Product
          </Typography>
      </Stack>
      <Container sx={{ marginTop: '50px' }}>
        <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontWeight: 'bold' }} variant="h5" noWrap component="div">
            Products
          </Typography>
          <StyledButton variant="outlined"> 
            Filter & Sort 
            <span style={{marginLeft:'5px' , display: 'flex', alignItems: 'center' }} >
              <SortIcon/>
            </span>
          </StyledButton>
        </Stack>
      </Container>
      <Container sx={{ marginTop: 5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">S.No</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{product.productName}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">
                    <ActiveButton variant="contained">
                      {product.status}
                    </ActiveButton>
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <EditBox>
                        <EditIcon sx={{ color: 'white' }}/>
                      </EditBox>
                      <DeleteBox>
                        <DeleteOutlineIcon />
                      </DeleteBox>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

const StyledButton = styled(Button)`
  color: black;
  border-color: black;
  &:hover {
    color: #616161; /* Grey 700 */
    border-color: black;
  }
  span {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
`;

const EditBox = styled(Box)({
  backgroundColor: '#424242', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50px',  
  height: '40px',
  borderRadius: '5px',
  cursor:'pointer',

  '&:hover': {
    backgroundColor: '#333333', 
  }

});

const DeleteBox = styled(Box)({
  backgroundColor: '#FF6666', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50px',  
  height: '40px',
  borderRadius: '5px',
  cursor:'pointer',

  '&:hover': {
    backgroundColor: '#CC5555', 
  }

});

const ActiveButton = styled(Button)`
  background-color: #FFD700; 
  color: black;
  text-transform: lowercase;

  &:hover {
    background-color: #FFC300; 
  }
`;

