'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import InventoryIcon from '@mui/icons-material/Inventory';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const navItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Events', path: '/events', icon: <EventIcon /> },
  { text: 'Organizations', path: '/organizations', icon: <BusinessIcon /> },
  { text: 'Contacts', path: '/contacts', icon: <ContactsIcon /> },
  { text: 'Products', path: '/products', icon: <InventoryIcon /> },
];

export default function TopBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleNavClick = (path: string) => {
    router.push(path);
    setDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ 
      textAlign: 'center',
      height: '100%',
      bgcolor: 'white'
    }}>
      <Typography variant="h6" sx={{ 
        my: 2,
        fontWeight: 'bold'
      }}>
        Portal
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => handleNavClick(item.path)}
              sx={{
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', mb: 8 }}>
      <AppBar 
        component="nav" 
        position="fixed"
        elevation={2}
        sx={{
          bgcolor: theme.palette.primary.main,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              color: theme.palette.primary.contrastText
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            }}
            onClick={() => handleNavClick('/')}
          >
            Class Acts Entertainment
          </Typography>

          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            gap: 1
          }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => handleNavClick(item.path)}
                startIcon={item.icon}
                sx={{
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
          variant="temporary"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText
            },
          }}
          open
        >
          {drawer}
        </Drawer>

    </Box>
  );
}