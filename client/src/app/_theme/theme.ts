'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c2c2c',
    },
    secondary: {
      main: '#6f6f6f',
    },
    background: {
      default: '#f4f4f4',
      paper: '#dedede',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
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
    borderRadius: 3,
  },
  typography: {
    fontFamily: '"customFont", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '20px',
      [`@media (min-width:576px)`]: { fontSize: '24px' },
      [`@media (min-width:768px)`]: { fontSize: '30px' },
      [`@media (min-width:992px)`]: { fontSize: '36px' },
      [`@media (min-width:1200px)`]: { fontSize: '40px' },
    },
    h2: {
      fontSize: '18px',
      [`@media (min-width:576px)`]: { fontSize: '22px' },
      [`@media (min-width:768px)`]: { fontSize: '28px' },
      [`@media (min-width:992px)`]: { fontSize: '32px' },
      [`@media (min-width:1200px)`]: { fontSize: '36px' },
    },
    h3: {
      fontSize: '16px',
      [`@media (min-width:576px)`]: { fontSize: '20px' },
      [`@media (min-width:768px)`]: { fontSize: '24px' },
      [`@media (min-width:992px)`]: { fontSize: '28px' },
      [`@media (min-width:1200px)`]: { fontSize: '32px' },
    },
    h4: {
      fontSize: '14px',
      [`@media (min-width:576px)`]: { fontSize: '18px' },
      [`@media (min-width:768px)`]: { fontSize: '22px' },
      [`@media (min-width:992px)`]: { fontSize: '26px' },
      [`@media (min-width:1200px)`]: { fontSize: '30px' },
    },
    h5: {
      fontSize: '12px',
      [`@media (min-width:576px)`]: { fontSize: '16px' },
      [`@media (min-width:768px)`]: { fontSize: '20px' },
      [`@media (min-width:992px)`]: { fontSize: '24px' },
      [`@media (min-width:1200px)`]: { fontSize: '28px' },
    },
    h6: {
      fontSize: '10px',
      [`@media (min-width:576px)`]: { fontSize: '14px' },
      [`@media (min-width:768px)`]: { fontSize: '18px' },
      [`@media (min-width:992px)`]: { fontSize: '22px' },
      [`@media (min-width:1200px)`]: { fontSize: '26px' },
    },
    subtitle1: {
      fontSize: '10px',
      [`@media (min-width:576px)`]: { fontSize: '12px' },
      [`@media (min-width:768px)`]: { fontSize: '14px' },
      [`@media (min-width:992px)`]: { fontSize: '16px' },
      [`@media (min-width:1200px)`]: { fontSize: '18px' },
    },
    subtitle2: {
      fontSize: '10px',
      [`@media (min-width:576px)`]: { fontSize: '12px' },
      [`@media (min-width:768px)`]: { fontSize: '13px' },
      [`@media (min-width:992px)`]: { fontSize: '14px' },
      [`@media (min-width:1200px)`]: { fontSize: '16px' },
    },
    body1: {
      fontSize: '12px',
      [`@media (min-width:576px)`]: {
        fontSize: '14px',
      },
      [`@media (min-width:768px)`]: {
        fontSize: '16px',
      },
      [`@media (min-width:992px)`]: {
        fontSize: '18px',
      },
      [`@media (min-width:1200px)`]: {
        fontSize: '20px',
      },
    },
    body2: {
      fontSize: '10px',
      [`@media (min-width:576px)`]: {
        fontSize: '12px',
      },
      [`@media (min-width:768px)`]: {
        fontSize: '14px',
      },
      [`@media (min-width:992px)`]: {
        fontSize: '16px',
      },
      [`@media (min-width:1200px)`]: {
        fontSize: '18px',
      },
    },
  },
  transitions: {
    duration: {
      standard: 600,
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
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          [`@media (max-width:576px)`]: {
            width: '12px',
            height: '12px',
          },
          [`@media (min-width:576px) and (max-width:768px)`]: {
            width: '16px',
            height: '16px',
          },
          [`@media (min-width:768px) and (max-width:992px)`]: {
            width: '22px',
            height: '22px',
          },
          [`@media (min-width:992px)`]: {
            width: '30px',
            height: '30px',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '20px',
          [`@media (max-width:576px)`]: {
            fontSize: '16px',
          },
          [`@media (min-width:576px) and (max-width:768px)`]: {
            fontSize: '18px',
          },
          [`@media (min-width:768px) and (max-width:992px)`]: {
            fontSize: '22px',
          },
          [`@media (min-width:992px)`]: {
            fontSize: '24px',
          },
        },
      },
    },
  },
});

export default theme;
