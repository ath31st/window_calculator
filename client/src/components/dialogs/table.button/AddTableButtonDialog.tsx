'use client';

import React, { useState } from 'react';
import { Box, Dialog, TextField, Typography, Button } from '@mui/material';
import { NewTableButton } from '@/types/api';

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
        <Typography variant="h6">Добавить кнопку</Typography>
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
        <Button variant="contained" onClick={handleAdd}>
          Добавить
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddTableButtonDialog;
