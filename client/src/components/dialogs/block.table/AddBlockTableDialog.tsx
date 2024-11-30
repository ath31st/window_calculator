'use client';

import React, { useState } from 'react';
import {
  Box,
  Dialog,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { NewBlockTable } from '@/types/api';
import { ButtonType } from '@/constants/button.type';

interface AddBlockTableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (blockTable: NewBlockTable) => void;
  frameBlockId: number;
}

const AddBlockTableDialog: React.FC<AddBlockTableDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  frameBlockId,
}) => {
  const [blockTableName, setBlockTableName] = useState('');
  const [buttonType, setButtonType] = useState('VALUE');

  const handleAdd = () => {
    if (blockTableName.trim()) {
      const newBlockTable: NewBlockTable = {
        frameBlockId,
        name: blockTableName.trim(),
        buttonType: buttonType as ButtonType,
      };
      onAdd(newBlockTable);
      setBlockTableName('');
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
        <Typography variant="h6">Добавить таблицу блока</Typography>
        <TextField
          label="Название таблицы блока"
          value={blockTableName}
          onChange={(e) => setBlockTableName(e.target.value)}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="button-type-label">Тип</InputLabel>
          <Select
            labelId="button-type-label"
            value={buttonType}
            onChange={(e) => setButtonType(e.target.value as ButtonType)}
          >
            <MenuItem value="MODIFIER">Модификатор</MenuItem>
            <MenuItem value="VALUE">Значение</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleAdd}>
          Добавить
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddBlockTableDialog;
