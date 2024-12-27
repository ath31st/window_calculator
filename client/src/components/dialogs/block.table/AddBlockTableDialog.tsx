'use client';

import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { NewBlockTable } from '@/types/api';
import { ButtonType } from '@/constants/button.type';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
    <BaseDialog
      isOpen={isOpen}
      title="Добавление таблицы блока"
      onClose={onClose}
      actions={<CommonButton onClick={handleAdd}>Добавить</CommonButton>}
    >
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
          label="Тип"
        >
          <MenuItem value="MODIFIER">Модификатор</MenuItem>
          <MenuItem value="VALUE">Значение</MenuItem>
        </Select>
      </FormControl>
    </BaseDialog>
  );
};

export default AddBlockTableDialog;
