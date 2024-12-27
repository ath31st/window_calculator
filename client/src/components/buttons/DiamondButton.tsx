'use client';

import { IconButton } from '@mui/material';
import React from 'react';

interface DiamondButtonProps {
  onClick?: () => void;
  icon: React.ReactElement;
  isActive?: boolean;
  isEditModeButton?: boolean;
}

const DiamondButton: React.FC<DiamondButtonProps> = ({
  onClick,
  icon,
  isActive = false,
  isEditModeButton = false,
}) => {
  const buttonStyles = {
    bgcolor: isEditModeButton && isActive ? 'primary.main' : 'background.paper',
    border: `3px solid ${isEditModeButton && isActive ? '#ffffff' : 'rgba(0, 0, 0, 0.12)'}`, // Рамка
    boxShadow: 2,
    borderRadius: '0',
    transform: 'rotate(45deg)',
    overflow: 'hidden',
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
    transform: 'rotate(-45deg)',
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

export default DiamondButton;
