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
    border: '4px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
  };

  return (
    <IconButton onClick={onClick} sx={buttonStyles}>
      {React.cloneElement(icon, {})}
    </IconButton>
  );
};

export default RoundButton;
