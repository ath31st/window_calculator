import React from 'react';
import { Button, ButtonProps, Typography } from '@mui/material';

interface CommonButtonProps extends ButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  variant = 'text',
  color = 'primary',
  ...rest
}) => {
  return (
    <Button variant={variant} color={color} {...rest}>
      <Typography
        sx={{
          fontSize: {
            xs: '8px',
            sm: '10px',
            md: '10px',
            lg: '12px',
            xl: '12px',
          },
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default CommonButton;
