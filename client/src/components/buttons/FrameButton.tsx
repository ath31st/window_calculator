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
        bgcolor: isActive ? 'primary.main' : 'primary.secondary',
        color: isActive ? 'text.primary' : 'text.secondary',
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
        minWidth: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }} onClick={onSelect}>
        <Typography variant="button" noWrap>
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
