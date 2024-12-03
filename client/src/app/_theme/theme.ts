'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0078d7',
    },
    secondary: {
      main: '#b0c4de',
    },
    background: {
      default: '#f5f5f5',
      paper: '#e0e0e0',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    success: {
      main: '#27ae60',
    },
    warning: {
      main: '#e67e22',
    },
    error: {
      main: '#c0392b',
    },
    info: {
      main: '#2980b9',
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontSize: 12,
  },
  transitions: {
    duration: {
      standard: 300,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

export default theme;
