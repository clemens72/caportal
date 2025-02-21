import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import logoCA from '../assets/logo.png'

export default function TopBar() {
  return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ marginRight: 2, alignItems: 'center', display: 'flex' }}>
            <Image src={logoCA} alt="Class Acts Logo" height={25} />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Class Acts Entertainment
          </Typography>
          <Button color="inherit">Log In</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
  );
}