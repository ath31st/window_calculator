'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005f8a',
    },
    secondary: {
      main: '#a7c6ed',
    },
    background: {
      default: '#9ecdfc',
      paper: '#85b7e9',
    },
    text: {
      primary: '#212d3e',
      secondary: '#6c7b8c',
    },
    success: {
      main: '#3cbf7b',
    },
    warning: {
      main: '#d8903f',
    },
    error: {
      main: '#e74c3c',
    },
    info: {
      main: '#3498db',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontSize: 14,
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
