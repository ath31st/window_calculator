'use client';

import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditFrameDialog from '@/components/dialogs/EditFrameDialog';
import DeleteFrameDialog from '@/components/dialogs/DeleteFrameDialog';
import theme from '@/app/_theme/theme';

interface FrameButtonProps {
  id: number;
  name: string;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void; 
  onEdit: (newName: string) => void; 
}

const FrameButton: React.FC<FrameButtonProps> = ({
  id,
  name,
  isActive,
  onSelect,
  onDelete,
  onEdit,
}) => {
  const [dialogType, setDialogType] = useState<'edit' | 'delete' | null>(null);

  const openEditDialog = () => setDialogType('edit');
  const openDeleteDialog = () => setDialogType('delete');
  const closeDialog = () => setDialogType(null);

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
        <Typography variant="body2" noWrap>
          {name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton size="small" onClick={openEditDialog}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={openDeleteDialog}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <EditFrameDialog
        isOpen={dialogType === 'edit'}
        onClose={closeDialog}
        onUpdate={onEdit}
        currentName={name}
      />

      <DeleteFrameDialog
        isOpen={dialogType === 'delete'}
        onClose={closeDialog}
        onDelete={onDelete}
        frameId={id}
      />
    </Box>
  );
};

export default FrameButton;
