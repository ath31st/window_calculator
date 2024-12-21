'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { FrameBlock } from '@/types/api';
import BaseDialog from '../BaseDialog';

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
    <BaseDialog
      isOpen={isOpen}
      title="Изменение фрейм блока"
      onClose={onClose}
      actions={<Button onClick={handleUpdate}>Изменить</Button>}
    >
      <TextField
        label="Наименование блока"
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
    </BaseDialog>
  );
};

export default EditFrameBlockDialog;
