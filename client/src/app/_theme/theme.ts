'use client';
import { createTheme } from '@mui/material/styles';

const getCssVariable = (name: string) => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }
  return '';
};

const theme = createTheme({
  palette: {
    primary: {
      main: getCssVariable('--color-primary') || '#8b4513',
    },
    secondary: {
      main: getCssVariable('--color-secondary') || '#d2b48c',
    },
    background: {
      default: getCssVariable('--color-bg-base') || '#3e2723',
      paper: getCssVariable('--color-bg-container') || '#795548',
    },
    text: {
      primary: getCssVariable('--color-text-base') || '#f5f5dc',
      secondary: getCssVariable('--color-text-secondary') || '#d7ccc8',
    },
    success: {
      main: getCssVariable('--color-success') || '#27ae60',
    },
    warning: {
      main: getCssVariable('--color-warning') || '#e67e22',
    },
    error: {
      main: getCssVariable('--color-error') || '#c0392b',
    },
    info: {
      main: getCssVariable('--color-info') || '#2980b9',
    },
  },
  shape: {
    borderRadius: parseInt(getCssVariable('--border-radius') || '0', 10),
  },
  typography: {
    fontSize: parseInt(getCssVariable('--font-size') || '18', 10),
  },
  transitions: {
    duration: {
      standard: parseInt(getCssVariable('--transition-duration') || '300', 10),
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: parseInt(getCssVariable('--breakpoint-sm') || '576', 10),
      md: parseInt(getCssVariable('--breakpoint-md') || '768', 10),
      lg: parseInt(getCssVariable('--breakpoint-lg') || '992', 10),
      xl: parseInt(getCssVariable('--breakpoint-xl') || '1200', 10),
    },
  },
});

export default theme;
