'use client';

import React, { useState } from 'react';
import { Box, Dialog, TextField, Typography, Button } from '@mui/material';

interface EditFrameDialogProps {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
  onUpdate: (name: string) => void;
}

const EditFrameDialog: React.FC<EditFrameDialogProps> = ({
  isOpen,
  currentName,
  onClose,
  onUpdate,
}) => {
  const [frameName, setFrameName] = useState('');

  const handleUpdate = () => {
    if (frameName.trim()) {
      onUpdate(frameName.trim());
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
        <Typography variant="h6">Изменить фрейм</Typography>
        <TextField
          label={currentName}
          value={frameName}
          onChange={(e) => setFrameName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleUpdate}>
          Изменить
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditFrameDialog;
