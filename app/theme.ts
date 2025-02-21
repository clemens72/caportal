'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f68c2c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;