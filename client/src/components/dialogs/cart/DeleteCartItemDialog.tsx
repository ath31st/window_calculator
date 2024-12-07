'use client';

import React from 'react';
import { Box, Dialog, Typography, Button } from '@mui/material';

interface DeleteCartItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  blockTableId: number;
}

const DeleteCartItemDialog: React.FC<DeleteCartItemDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  blockTableId,
}) => {
  const handleDelete = () => {
    onDelete(blockTableId);
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
        <Typography variant="h6">Удалить услугу/товар</Typography>
        <Typography variant="body2">
          Вы уверены, что хотите удалить эту позицию?
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

export default DeleteCartItemDialog;
