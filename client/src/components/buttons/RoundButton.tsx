'use client';

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
    bgcolor: isEditModeButton && isActive ? 'primary.main' : 'background.paper',
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
  };

  const iconStyles = {
    fontSize: {
      xs: 18,
      sm: 20,
      md: 24,
      lg: 28,
    },
    height: {
      xs: 18,
      sm: 20,
      md: 24,
      lg: 28,
    },
    width: {
      xs: 18,
      sm: 20,
      md: 24,
      lg: 28,
    },
  };

  return (
    <IconButton onClick={onClick} sx={buttonStyles}>
      {React.cloneElement(icon, { sx: iconStyles })}
    </IconButton>
  );
};

export default RoundButton;
