'use client';

import React, { useState } from 'react';
import { TextField } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';
import { NewFrame } from '@/types/api';

interface AddFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newFrame: NewFrame) => void;
}

const AddFrameDialog: React.FC<AddFrameDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [frameName, setFrameName] = useState('');
  const [order, setOrder] = useState<number>(0);

  const handleAdd = () => {
    if (frameName.trim() && order >= 0 && order <= 999) {
      const newFrame: NewFrame = {
        name: frameName.trim(),
        order: order,
      };
      onAdd(newFrame);
      setFrameName('');
      setOrder(0);
      onClose();
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Добавление фрейма"
      onClose={onClose}
      actions={<CommonButton onClick={handleAdd}>Добавить</CommonButton>}
    >
      <TextField
        label="Наименование фрейма"
        value={frameName}
        onChange={(e) => setFrameName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Порядок (0-999)"
        type="number"
        value={order}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (!isNaN(value) && value >= 0 && value <= 999) {
            setOrder(value);
          }
        }}
        fullWidth
        slotProps={{
          htmlInput: {
            min: 0,
            max: 999,
          },
        }}
      />
    </BaseDialog>
  );
};

export default AddFrameDialog;
