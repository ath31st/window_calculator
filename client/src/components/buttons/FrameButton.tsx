'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import theme from '@/app/_theme/theme';
import { FrameEditDeleteButtons } from './FrameEditDeleteButtons';
import { Frame } from '@/types/api';

interface FrameButtonProps {
  currentFrame: Frame;
  isActive: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (updFrame: Frame) => void;
  isEditMode: boolean;
  isLoading: boolean;
  isTargetFrame: boolean;
}

const FrameButton: React.FC<FrameButtonProps> = ({
  currentFrame,
  isActive,
  onSelect,
  onDelete,
  onEdit,
  isEditMode,
  isLoading,
  isTargetFrame,
}) => {
  return (
    <Box
      sx={{
        padding: 1,
        cursor: 'pointer',
        bgcolor: isActive ? 'secondary.main' : 'background.paper',
        color: isActive ? 'text.primary' : 'text.secondary',
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
        minWidth: {
          xs: 100,
          sm: 120,
          md: 150,
          lg: 150,
        },
        height: {
          xs: 30,
          sm: 35,
          md: 45,
          lg: 50,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
          animation:
            isTargetFrame && isLoading
              ? 'fillGradient 2.5s linear infinite'
              : 'none',
          opacity: isTargetFrame && isLoading ? 1 : 0,
          transition: 'opacity 0.3s ease',
        },
        '@keyframes fillGradient': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      }}
      onClick={() => onSelect(currentFrame.id)}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography variant="body1" noWrap>
          {currentFrame.name}
        </Typography>
      </Box>

      {isEditMode && (
        <FrameEditDeleteButtons
          currentFrame={currentFrame}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </Box>
  );
};

export default FrameButton;
