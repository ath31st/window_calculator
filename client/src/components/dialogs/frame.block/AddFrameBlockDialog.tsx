'use client';

import React, { useState } from 'react';
import { TextField, Switch, FormControlLabel } from '@mui/material';
import { NewFrameBlock } from '@/types/api';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
    <BaseDialog
      isOpen={isOpen}
      title="Добавление блока фрейма"
      onClose={onClose}
      actions={<CommonButton onClick={handleAdd}>Добавить</CommonButton>}
    >
      <TextField
        label="Наименование блока фрейма"
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
        label="Описание (опционально)"
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
    </BaseDialog>
  );
};

export default AddFrameBlockDialog;
