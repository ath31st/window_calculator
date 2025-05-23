'use client';

import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { BlockTable } from '@/types/api';
import { ButtonType } from '@/constants/button.type';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
    <BaseDialog
      isOpen={isOpen}
      title="Изменение таблицы блока"
      onClose={onClose}
      actions={<CommonButton onClick={handleUpdate}>Изменить</CommonButton>}
    >
      <TextField
        label="Наименование таблицы блока"
        value={blockTable.name}
        onChange={(e) => handleChange('name', e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="button-type-label">Тип</InputLabel>
        <Select
          id="button-type-select"
          name="buttonType"
          labelId="button-type-label"
          value={blockTable.buttonType}
          onChange={(e) =>
            handleChange('buttonType', e.target.value as ButtonType)
          }
          label="Тип"
        >
          <MenuItem value="MODIFIER">Модификатор</MenuItem>
          <MenuItem value="VALUE">Значение</MenuItem>
        </Select>
      </FormControl>
    </BaseDialog>
  );
};

export default EditBlockTableDialog;
