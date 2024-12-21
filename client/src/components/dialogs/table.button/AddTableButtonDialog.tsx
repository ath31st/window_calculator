'use client';

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { NewTableButton } from '@/types/api';
import BaseDialog from '../BaseDialog';

interface AddTableButtonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tableButton: NewTableButton) => void;
  blockTableId: number;
}

const AddTableButtonDialog: React.FC<AddTableButtonDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  blockTableId,
}) => {
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState<number>(0);

  const handleAdd = () => {
    if (name.trim() && inputValue) {
      const newTableButton: NewTableButton = {
        blockTableId,
        name: name.trim(),
        value: inputValue,
      };
      onAdd(newTableButton);
      setName('');
      setInputValue(0);
      onClose();
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Добавление кнопки"
      onClose={onClose}
      actions={<Button onClick={handleAdd}>Добавить</Button>}
    >
      <TextField
        label="Название кнопки"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Значение кнопки"
        value={inputValue}
        onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
        fullWidth
        slotProps={{
          input: {
            type: 'number',
          },
        }}
      />
    </BaseDialog>
  );
};

export default AddTableButtonDialog;
