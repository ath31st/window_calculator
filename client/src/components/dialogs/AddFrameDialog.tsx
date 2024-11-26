'use client';

import React, { useState } from 'react';
import { Box, Dialog, TextField, Typography, Button } from '@mui/material';

interface AddFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddFrameDialog: React.FC<AddFrameDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [frameName, setFrameName] = useState('');

  const handleAdd = () => {
    if (frameName.trim()) {
      onAdd(frameName.trim());
      setFrameName('');
      onClose();
    }
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
        <Typography variant="h6">Добавить фрейм</Typography>
        <TextField
          label="Название фрейма"
          value={frameName}
          onChange={(e) => setFrameName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd}>
          Добавить
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddFrameDialog;
