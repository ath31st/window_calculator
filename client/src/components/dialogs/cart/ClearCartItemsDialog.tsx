'use client';

import React from 'react';
import { Box, Dialog, Typography, Button } from '@mui/material';

interface ClearCartItemsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

const ClearCartItemsDialog: React.FC<ClearCartItemsDialogProps> = ({
  isOpen,
  onClose,
  onClear,
}) => {
  const handleClear = () => {
    onClear();
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
        <Typography variant="h6">Очистить корзину</Typography>
        <Typography variant="body2">
          Вы уверены, что хотите очистить корзину?
        </Typography>
        <Button variant="contained" color="error" onClick={handleClear}>
          Очистить
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Отмена
        </Button>
      </Box>
    </Dialog>
  );
};

export default ClearCartItemsDialog;
