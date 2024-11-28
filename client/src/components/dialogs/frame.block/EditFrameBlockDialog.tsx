'use client';

import React, { useState } from 'react';
import {
  Box,
  Dialog,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { FrameBlock } from '@/types/api';

interface EditFrameBlockDialogProps {
  isOpen: boolean;
  currentFrameBlock: FrameBlock;
  onClose: () => void;
  onUpdate: (updatedFrameBlock: FrameBlock) => void;
}

const EditFrameBlockDialog: React.FC<EditFrameBlockDialogProps> = ({
  isOpen,
  currentFrameBlock,
  onClose,
  onUpdate,
}) => {
  const [frameBlock, setFrameBlock] = useState<FrameBlock>(currentFrameBlock);

  const handleChange = (key: keyof FrameBlock, value: unknown) => {
    setFrameBlock((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(frameBlock);
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
        <Typography variant="h6">Изменить фрейм блок</Typography>
        <TextField
          label="Имя"
          value={frameBlock.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />
        <TextField
          label="Заголовок ввода"
          value={frameBlock.inputTitle}
          onChange={(e) => handleChange('inputTitle', e.target.value)}
          fullWidth
        />
        <TextField
          label="Описание"
          value={frameBlock.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        <FormControlLabel
          control={
            <Switch
              checked={frameBlock.isWindowSizeEnabled}
              onChange={(e) =>
                handleChange('isWindowSizeEnabled', e.target.checked)
              }
            />
          }
          label="Включить размер окна"
        />
        <Button variant="contained" onClick={handleUpdate}>
          Сохранить изменения
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditFrameBlockDialog;
