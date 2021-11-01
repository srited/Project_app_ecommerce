/*
 * Header Tab consisting of homelogo,wishcart,itemcart and account
 */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import homelogo from '../Images/hom24.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../ProductList.css';

 
export default function PrimarySearchAppBar() {
  
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor:"orangered" }}>
                <Toolbar>
                    <Typography noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <img src={homelogo} alt="Logo" />
                    </Typography>

                    <Typography sx={{ display: { xs: 'none', sm: 'block', fontFamily: 'proximanova-reg,sans-serif' } }}>
                        <span className={'Tagline'}>THE ONLINE DESTINATION FOR HOME AND LIVING</span>
                    </Typography>

                     <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="4 items in your cart" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            <IconButton size="large" aria-label="4 items in your cart" color="inherit">
                                <Badge badgeContent={6} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" edge="end" aria-label="account of current user"
                                aria-haspopup="true" color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" aria-label="show more" aria-haspopup="true" color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </Box>
                </Toolbar>
            </AppBar>
             
        </Box>
    );
}