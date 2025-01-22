'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import theme from '@/app/_theme/theme';
import { FrameEditDeleteButtons } from './FrameEditDeleteButtons';

interface FrameButtonProps {
  id: number;
  name: string;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onEdit: (newName: string) => void;
  isEditMode: boolean;
}

const FrameButton: React.FC<FrameButtonProps> = ({
  id,
  name,
  isActive,
  onSelect,
  onDelete,
  onEdit,
  isEditMode,
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
      }}
      onClick={onSelect}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        <Typography variant="body1" noWrap>
          {name}
        </Typography>
      </Box>

      {isEditMode && (
        <FrameEditDeleteButtons
          id={id}
          currentName={name}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </Box>
  );
};

export default FrameButton;
