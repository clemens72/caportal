'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import Image from 'next/image';
//import logoCA from '../../public/next.svg';
import { useRouter } from 'next/navigation';
import UserButton from './user-button';

export default function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleClose();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            marginRight: 2,
            alignItems: 'center',
            display: 'flex',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/')}
        >
          {/* <Image src={logoCA} alt="Class Acts Logo" height={25} /> */}
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/')}
        >
          Class Acts Entertainment
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('/auth/signin')}>
            Sign Out
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/calendar')}>
            Calendar
          </MenuItem>
        </Menu>
        <UserButton />
      </Toolbar>
    </AppBar>
  );
}
