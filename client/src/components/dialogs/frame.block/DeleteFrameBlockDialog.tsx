'use client';

import React from 'react';
import { Box, Dialog, Typography, Button } from '@mui/material';

interface DeleteFrameBlockDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  frameBlockId: number;
}

const DeleteFrameBlockDialog: React.FC<DeleteFrameBlockDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  frameBlockId,
}) => {
  const handleDelete = () => {
    onDelete(frameBlockId);
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
        <Typography variant="h6">Удалить фрейм блок</Typography>
        <Typography variant="body2">
          Вы уверены, что хотите удалить этот фрейм блок?
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

export default DeleteFrameBlockDialog;
