'use client';

import React, { useState } from 'react';
import { Box, Dialog, TextField, Typography, Button } from '@mui/material';
import { TableButton } from '@/types/api';

interface EditTableButtonDialogProps {
  isOpen: boolean;
  currentTableButton: TableButton;
  onClose: () => void;
  onUpdate: (updatedTableButton: TableButton) => void;
}

const EditTableButtonDialog: React.FC<EditTableButtonDialogProps> = ({
  isOpen,
  currentTableButton,
  onClose,
  onUpdate,
}) => {
  const [tableButton, setTableButton] =
    useState<TableButton>(currentTableButton);

  const handleChange = (key: keyof TableButton, value: string | number) => {
    setTableButton((prev) => ({
      ...prev,
      [key]: key === 'value' ? parseFloat(value as string) || '' : value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(tableButton);
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
        <Typography variant="h6">Изменить кнопку</Typography>
        <TextField
          label="Имя"
          value={tableButton.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />

        <TextField
          label="Значение"
          value={tableButton.value}
          onChange={(e) => handleChange('value', e.target.value)}
          fullWidth
          slotProps={{
            input: {
              type: 'number',
            },
          }}
        />

        <Button variant="contained" onClick={handleUpdate}>
          Изменить
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditTableButtonDialog;
