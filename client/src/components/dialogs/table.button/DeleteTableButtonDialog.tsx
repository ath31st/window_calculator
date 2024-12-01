'use client';

import React from 'react';
import { Box, Dialog, Typography, Button } from '@mui/material';

interface DeleteTableButtonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  tableButtonId: number;
}

const DeleteTableButtonDialog: React.FC<DeleteTableButtonDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  tableButtonId,
}) => {
  const handleDelete = () => {
    onDelete(tableButtonId);
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
        <Typography variant="h6">Удалить кнопку</Typography>
        <Typography variant="body2">
          Вы уверены, что хотите удалить эту кнопку?
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

export default DeleteTableButtonDialog;
