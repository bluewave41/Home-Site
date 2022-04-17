import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

export default function ClippedDrawer(props) {
    const loggedInList = [{ label: 'Home', icon: <HomeIcon /> }, { label: 'Shopping', icon: <ShoppingCartIcon /> }, { label: 'Menu', icon: <MenuBookIcon /> }, { label: 'Logout', icon: <LogoutIcon /> }];
    const notLoggedInList = [{ label: 'Login' , icon: <LoginIcon /> }, { label: 'Register', icon: <AppRegistrationIcon /> }];
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Home Site
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: props.width,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: props.width, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {(props.username ? loggedInList : notLoggedInList).map((el, index) => (
                            <Link key={el.label} href={`${el.label == 'Home' ? '/' : '/' + el.label.toLowerCase()}`} passHref>
                                <ListItem button key={el.label}>
                                    <ListItemIcon>
                                        {el.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={el.label} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}