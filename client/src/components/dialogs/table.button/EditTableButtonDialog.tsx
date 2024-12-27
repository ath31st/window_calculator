'use client';

import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { TableButton } from '@/types/api';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
    <BaseDialog
      isOpen={isOpen}
      title="Изменение кнопки"
      onClose={onClose}
      actions={<CommonButton onClick={handleUpdate}>Изменить</CommonButton>}
    >
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
    </BaseDialog>
  );
};

export default EditTableButtonDialog;
