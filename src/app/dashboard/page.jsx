"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import CategoryIcon from '@mui/icons-material/Category';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import uiImg from '../../../public/assets/dotlo-1-1.png'
import india from '../../../public/assets/india.png'
import { Button } from '@mui/material';
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export default function PrimarySearchAppBar() {

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () =>{
    try {
      await signOut({callbackUrl:"/login"}); 
      console.log("Logged out successfully");
      if (router.pathname !== "/login") {
        router.push("/login"); 
      }
    } catch (error) {
      console.error("Error in logging out", error);
    }
}

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      menuprops={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        getContentAnchorEl: null 
      }}
      PaperProps={{
        style: {
          width: 320,
        },
      }}
    >
      <MenuItem onClick={() => router.push('/account')}>My Account</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Language</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{marginRight:10}}>EN</span>
          <Image style={{ height: '25px', width: '25px'}} src={india} alt='India'/>
        </div>
      </MenuItem>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Button
          onClick={handleLogout}
          sx={{
            width: 300,
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#424242', 
            },
          }}
          variant="contained"
        >
          LOGOUT
        </Button>
      </div>
    </Menu>
  );
  
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="wishlist" color="inherit">
            <FavoriteBorderRoundedIcon />
        </IconButton>
        <p>Wishlist</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="Cart"
          color="inherit"
        >
            <ShoppingCartRoundedIcon />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonRoundedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ bgcolor: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className="underline-hover"
            sx={{ mr: 2 }}
          >
            <Image src={uiImg} alt='UiImg' style={{ height: '60px', width: '60px' }} />
          </IconButton>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', }, color: 'white', fontSize: '1.2rem',cursor:'pointer','& span:hover': {
              borderBottom: '2px solid rgb(138, 115, 80)'}}}>
            <span>New</span>
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'white', fontSize: '1.2rem', marginLeft:5, cursor:'pointer','& span:hover': {
              borderBottom: '2px solid rgb(138, 115, 80)'}}}>
            <span>Men</span>
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'white', fontSize: '1.2rem', marginLeft:5, cursor:'pointer','& span:hover': {
              borderBottom: '2px solid rgb(138, 115, 80)'}}}>
            <span>Women</span>
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'white', fontSize: '1.2rem', marginLeft:5, cursor:'pointer','& span:hover': {
              borderBottom: '2px solid rgb(138, 115, 80)'}}}>
            <span>Kids</span>
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'white', fontSize: '1.2rem', marginLeft:5, cursor:'pointer','& span:hover': {
              borderBottom: '2px solid rgb(138, 115, 80)'}}}>
            <span>Sports</span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="SEARCH"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="wishlist" color="inherit">
              <FavoriteBorderRoundedIcon/>
            </IconButton>
            <IconButton
              size="large"
              aria-label="cart"
              color="inherit"
            >
              <ShoppingCartRoundedIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <PersonRoundedIcon/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Box component="nav">
        <Drawer
          variant="permanent"
          sx={{
              width: drawerWidth, 
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { backgroundColor:'black', width: drawerWidth, boxSizing: 'border-box' },
              zIndex: theme => theme.zIndex.drawer,
            }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <Toolbar sx={{ flexGrow: 1 }} />
              <ListItem >
                <StyledListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <HomeIcon /> 
                  </ListItemIcon>
                  <ListItemText sx={{color:'white'}} primary="Home" />
                </StyledListItemButton>
              </ListItem>

              <ListItem >
                <StyledListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <FavoriteBorderRoundedIcon /> 
                  </ListItemIcon>
                  <ListItemText sx={{color:'white'}} primary="Wishlist" />
                </StyledListItemButton>
              </ListItem>

              <ListItem >
                <StyledListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <LoyaltyIcon /> 
                  </ListItemIcon>
                  <ListItemText sx={{color:'white'}} primary="Sale" />
                </StyledListItemButton>
              </ListItem>

              <ListItem >
                <StyledListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <WhatshotIcon /> 
                  </ListItemIcon>
                  <ListItemText sx={{color:'white'}} primary="New & Treding" />
                </StyledListItemButton>
              </ListItem>

              <ListItem onClick={() => router.push('/add-product')}>
                <StyledListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <QueuePlayNextIcon /> 
                  </ListItemIcon>
                  <ListItemText sx={{color:'white'}} primary="Add Product" />
                </StyledListItemButton>
              </ListItem>

              <ListItem onClick={() => router.push('/products')}>
                <StyledListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <CategoryIcon /> 
                  </ListItemIcon>
                  <ListItemText sx={{color:'white'}} primary="Products" />
                </StyledListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.8), 
    background: 'linear-gradient(to right, #FF5733, #FFBD33)',
    borderRadius:20 
  },
}));