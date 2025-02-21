'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(232,131,0,0.92)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;