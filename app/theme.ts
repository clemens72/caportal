'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f68c2c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#333333',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: '#333333',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#333333',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#333333',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#333333',
      marginBottom: '1rem',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      color: '#666666',
      lineHeight: 1.6,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 'normal',
      color: '#666666',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      color: '#666666',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#f68c2c',
          color: '#ffffff',
          fontWeight: 600,
          padding: '10px 25px',
          '&:hover': {
            backgroundColor: '#e67d1d',
          },
        },
      },
    },
  },
});

export default theme