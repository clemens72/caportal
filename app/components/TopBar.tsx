'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import InventoryIcon from '@mui/icons-material/Inventory';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
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
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const drawerWidth = 240;
const miniDrawerWidth = 65;

const navItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Events', path: '/events', icon: <EventIcon /> },
  { text: 'Organizations', path: '/organizations', icon: <BusinessIcon /> },
  { text: 'Contacts', path: '/contacts', icon: <ContactsIcon /> },
  { text: 'Products', path: '/products', icon: <InventoryIcon /> },
];

export default function TopBar() {
  const { data: session } = useSession();
  const avatar = session?.user?.image || '/default-avatar.png';
  const username = session?.user?.name || 'Test User';
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();

  const handleNavClick = (path: string) => {
    router.push(path);
    setMobileDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const mobileDrawer = (
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
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const desktopDrawer = (
    <Box sx={{
      textAlign: 'center',
      height: '100%',
      bgcolor: 'white',
      width: miniDrawerWidth,
    }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Tooltip title={item.text} placement="right">
              <ListItemButton
                onClick={() => handleNavClick(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: theme.palette.primary.main
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        position="fixed"
        elevation={2}
        sx={{
          bgcolor: theme.palette.primary.main,
          ml: { sm: `${miniDrawerWidth}px` },
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
              display: { sm: 'none' },
              color: theme.palette.primary.contrastText
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              display: 'inline-block',
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.contrastText,
                opacity: 0.9,
              }}
            >
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>

            <Tooltip title="Account">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.contrastText,
                    color: theme.palette.primary.main,
                  }}
                  src={avatar}
                  alt={username}
                >
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              {username}
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleNavClick('/admin')}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Admin Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => signOut({ callbackUrl: '/auth/signin' })}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: miniDrawerWidth },
          flexShrink: { sm: 0 }
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileDrawerOpen}
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
          {mobileDrawer}
        </Drawer>

        {/* Desktop mini drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              mt: '65px',
              boxSizing: 'border-box',
              width: miniDrawerWidth,
              bgcolor: 'white',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            },
          }}
          open
        >
          {desktopDrawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${miniDrawerWidth}px)` },
          ml: { sm: `${miniDrawerWidth}px` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}