'use client';

import React from 'react';
import { Box, Dialog, Typography, Button } from '@mui/material';

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  userId: number;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  userId,
}) => {
  const handleDelete = () => {
    onDelete(userId);
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
        <Typography variant="h6">Удалить пользователя</Typography>
        <Typography variant="body2">
          Вы уверены, что хотите удалить этого пользователя?
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

export default DeleteUserDialog;
