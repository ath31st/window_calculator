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
import { BlockTable } from '@/types/api';
import { ButtonType } from '@/constants/button.type';

interface EditBlockTableDialogProps {
  isOpen: boolean;
  currentBlockTable: BlockTable;
  onClose: () => void;
  onUpdate: (updatedBlockTable: BlockTable) => void;
}

const EditBlockTableDialog: React.FC<EditBlockTableDialogProps> = ({
  isOpen,
  currentBlockTable,
  onClose,
  onUpdate,
}) => {
  const [blockTable, setblockTable] = useState<BlockTable>(currentBlockTable);

  const handleChange = (key: keyof BlockTable, value: unknown) => {
    setblockTable((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(blockTable);
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
        <Typography variant="h6">Изменить таблицу блока</Typography>
        <TextField
          label="Имя"
          value={blockTable.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="button-type-label">Тип</InputLabel>
          <Select
            labelId="button-type-label"
            value={blockTable.buttonType}
            onChange={(e) =>
              handleChange('buttonType', e.target.value as ButtonType)
            }
          >
            <MenuItem value="MODIFIER">Модификатор</MenuItem>
            <MenuItem value="VALUE">Значение</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleUpdate}>
          Изменить
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditBlockTableDialog;
