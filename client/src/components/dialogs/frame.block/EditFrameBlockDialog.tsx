'use client';

import React, { useState } from 'react';
import { TextField, FormControlLabel, Switch } from '@mui/material';
import { FrameBlock } from '@/types/api';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
      title="Изменение блока фрейма"
      onClose={onClose}
      actions={<CommonButton onClick={handleUpdate}>Изменить</CommonButton>}
    >
      <TextField
        label="Наименование блока фрейма"
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
        name="description"
        label="Описание (опционально)"
        value={frameBlock.description}
        onChange={(e) => handleChange('description', e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
      <FormControlLabel
        control={
          <Switch
            id="isWindowSizeEnabled"
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
