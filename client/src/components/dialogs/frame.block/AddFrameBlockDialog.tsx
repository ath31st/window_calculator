'use client';

import React, { useState } from 'react';
import {
  Box,
  Dialog,
  TextField,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { NewFrameBlock } from '@/types/api';

interface AddFrameBlockDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (frameBlock: NewFrameBlock) => void;
  frameId: number;
}

const AddFrameBlockDialog: React.FC<AddFrameBlockDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  frameId,
}) => {
  const [name, setName] = useState('');
  const [isWindowSizeEnabled, setIsWindowSizeEnabled] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (name.trim() && inputTitle.trim()) {
      const newFrameBlock: NewFrameBlock = {
        frameId,
        name: name.trim(),
        isWindowSizeEnabled,
        inputTitle: inputTitle.trim(),
        description: description.trim(),
      };
      onAdd(newFrameBlock);
      setName('');
      setInputTitle('');
      setDescription('');
      setIsWindowSizeEnabled(false);
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
          minWidth: 300,
        }}
      >
        <Typography variant="h6">Добавить фрейм-блок</Typography>
        <TextField
          label="Название блока"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Заголовок ввода"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isWindowSizeEnabled}
              onChange={(e) => setIsWindowSizeEnabled(e.target.checked)}
            />
          }
          label="Включить размер окна"
        />
        <Button variant="contained" onClick={handleAdd}>
          Добавить
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddFrameBlockDialog;
