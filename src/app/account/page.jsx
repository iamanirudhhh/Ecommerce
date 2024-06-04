"use client";
import React, { useEffect, useState } from "react";
import { Stack, Typography, Button, Box, Divider, Grid } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockIcon from "@mui/icons-material/Lock";
import CallIcon from "@mui/icons-material/Call";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress'; 
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AccountPage() {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    mobileNo: "",
  });

  const [addressData, setAddressData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      setUserData({
        email: session.user.email || "",
        firstName: session.user.firstName || "",
        mobileNo: session.user.mobileNo || "",
      });

      fetchAddress(session.user.id);
    }
  }, [session]);

  const fetchAddress = async (userId) => {
    try {
      const response = await axios.get(
        `/api/users/fetchaddress?userId=${userId}`
      );
      setAddressData(response.data.user);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddressData(null);
    }
  };

  function handleBreadcrumbClick(event) {
    event.preventDefault();
  }

  const handlePopupClose = () => {
    setOpenPopup(false);
};

  const HandleDelete = async(id)=>{
    try {
        setLoading(true);
        const response = await axios.delete(`/api/users/deleteaddress?id=${id}`);
        setAddressData(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
        console.error("Error fetching address:", error);
        setAddressData(null);
    }finally{
        setLoading(false);
        setOpenPopup(false);
    }   
  }

  const addressDelete = async() => {
    setOpenPopup(true);
  }
  
  return (
    <>
      <Navbar />
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
            My Account
          </Link>
        </Breadcrumbs>
        <Typography sx={{fontWeight:'bold', fontSize:23}}>
          Dashboard
        </Typography>
        <Typography sx={{fontWeight:'bold', fontSize:40}}>
          My Account
        </Typography>
      </Stack>
      <Box marginTop={5}>
        <Grid container justifyContent="center" spacing={8}>
          <Grid item xs={4} direction="column">
            <Stack spacing={2} direction="column">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <PermIdentityIcon />
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                    noWrap
                    component="div"
                  >
                    Profile
                  </Typography>
                </Stack>
                <Typography
                  onClick={() => router.push("/account/edit-profile")}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                  noWrap
                  component="div"
                >
                  <StyledSpan>EDIT PROFILE</StyledSpan>
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    noWrap
                    component="div"
                  >
                    Name
                  </Typography>
                  <Typography
                    sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                    noWrap
                    component="div"
                  >
                    {userData.firstName}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    noWrap
                    component="div"
                  >
                    Email
                  </Typography>
                  <Typography
                    sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                    noWrap
                    component="div"
                  >
                    {userData.email}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack marginTop={7} spacing={2} direction="column">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <LockIcon />
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                    noWrap
                    component="div"
                  >
                    Password
                  </Typography>
                </Stack>
                <Typography
                  onClick={() => router.push("/account/edit-password")}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                  noWrap
                  component="div"
                >
                  <StyledSpan>CHANGE PASSWORD</StyledSpan>
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    noWrap
                    component="div"
                  >
                    Password
                  </Typography>
                  <Typography
                    sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                    noWrap
                    component="div"
                  >
                    ********
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack marginTop={7} spacing={2} direction="column">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <CallIcon />
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    noWrap
                    component="div"
                  >
                    Phone Number
                  </Typography>
                </Stack>
                <Typography
                  onClick={() => router.push("/account/edit-phone")}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                  noWrap
                  component="div"
                >
                  <StyledSpan>CHANGE PHONE NUMBER</StyledSpan>
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.0rem" }}
                    noWrap
                    component="div"
                  >
                    Phone Number
                  </Typography>
                  <Typography
                    sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                    noWrap
                    component="div"
                  >
                    {userData.mobileNo}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4} direction="column">
            <Stack spacing={2} direction="column">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <LibraryBooksIcon />
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                    noWrap
                    component="div"
                  >
                    Address Book
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="column">
                {addressData  && addressData.map((item, index) => (
                  <div key={index}>
                    {" "}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          noWrap
                          component="div"
                        >
                          {item.addressTitle ? item.addressTitle : ""}
                          {"   "}
                          {item.byDefaultAddress === "true" ? `[Default]` : ""}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <HoverIcon>
                          <BorderColorIcon
                            onClick={() =>
                              router.push(
                                `/account/edit-address?id=${item._id}`
                              )
                            }
                          />
                        </HoverIcon>
                        <HoverIcon>
                          <DeleteOutlineIcon
                            onClick={addressDelete}
                          />
                        </HoverIcon>
                        <BootstrapDialog
                            open={openPopup}
                            onClose={handlePopupClose}
                            aria-labelledby="customized-dialog-title" 
                            >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <DialogTitle sx={{ m: 0, p: 2, flexGrow: 1 }} id="customized-dialog-title">
                                    Are you sure you want to remove the following Address?
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={handlePopupClose}
                                    sx={{
                                        marginLeft: 'auto',
                                        right: 8,
                                        color: "black",
                                    }}
                                    >
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                            <DialogContent dividers>
                                <Typography sx={{fontWeight:'bold', fontSize:20}} gutterBottom>
                                    {item.addressTitle}
                                </Typography>
                                <Box display="flex" justifyContent="center" marginTop={2}>
                                    <SaveButton
                                        disabled={loading}
                                        onClick={() => HandleDelete(item._id)}
                                        style={{width:300}}
                                        sx={{ fontWeight: "bold", marginTop:3 }}
                                        variant="contained">
                                        {loading ? <CircularProgress size={24} /> : "Remove"}
                                    </SaveButton>
                                </Box>
                            </DialogContent>
                        </BootstrapDialog>
                      </Stack>
                    </Stack>
                    <Typography
                      sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                      noWrap
                      component="div"
                    >
                      {item.firstName ? item.firstName : ""}{" "}
                      {item.lastName ? item.lastName : ""}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                      noWrap
                      component="div"
                    >
                      {item.addressLine ? item.addressLine : ""}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                      noWrap
                      component="div"
                    >
                      {item.city ? item.city : ""}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                      noWrap
                      component="div"
                    >
                      {item.pincode ? item.pincode : ""}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.0rem", fontFamily: "Times New Roman" }}
                      noWrap
                      component="div"
                    >
                      {item.mobileNo ? item.mobileNo : ""}
                    </Typography>
                  </div>
                ))}

                <Stack direction="column" marginTop={2}>
                  <SaveButton
                    onClick={() => router.push("/account/add-address")}
                    sx={{ fontWeight: "bold" }}
                    variant="contained"
                  >
                    Add New
                  </SaveButton>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const StyledSpan = styled.span`
  border-bottom: 2px solid #bdbdbd;
  transition: border-bottom 0.3s ease;

  &:hover {
    border-color: black;
  }
`;

const HoverIcon = styled.div`
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SaveButton = styled(Button)`
  && {
    width: 140px;
    height: 40px;
    background-color: black;
    color: white;

    &:hover {
      background-color: #424242;
    }
  }
`;

const BootstrapDialog = styled(Dialog)(() => ({
    '& .MuiDialogContent-root': {
      padding: 15 ,
    },
    '& .MuiDialogActions-root': {
      padding: 15,
    },
}));

