'use client';

import theme from '@/app/_theme/theme';
import { IconButton } from '@mui/material';
import React from 'react';

interface RoundButtonProps {
  onClick?: () => void;
  icon: React.ReactElement;
  isActive?: boolean;
  isEditModeButton?: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  onClick,
  icon,
  isActive = false,
  isEditModeButton = false,
}) => {
  const buttonStyles = {
    bgcolor:
      isEditModeButton && isActive
        ? theme.palette.secondary.main
        : theme.palette.background.paper,
    boxShadow: 4,
    height: {
      xs: 30,
      sm: 35,
      md: 45,
      lg: 50,
    },
    width: {
      xs: 30,
      sm: 35,
      md: 45,
      lg: 50,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: '20%',
    outline: `1px solid ${theme.palette.background.default}`,
    outlineOffset: 4,
  };

  return (
    <IconButton onClick={onClick} sx={buttonStyles}>
      {React.cloneElement(icon, {})}
    </IconButton>
  );
};

export default RoundButton;
