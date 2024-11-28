'use client';

import React from 'react';
import { Box, Dialog, Typography, Button } from '@mui/material';

interface DeleteFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  frameId: number;
}

const DeleteFrameDialog: React.FC<DeleteFrameDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  frameId,
}) => {
  const handleDelete = () => {
    onDelete(frameId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Удалить фрейм</Typography>
        <Typography variant="body2">
          Вы уверены, что хотите удалить этот фрейм?
        </Typography>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Удалить
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Отмена
        </Button>
      </Box>
    </Dialog>
  );
};

export default DeleteFrameDialog;
