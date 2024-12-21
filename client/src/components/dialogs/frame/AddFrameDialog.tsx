'use client';

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import BaseDialog from '../BaseDialog';

interface AddFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddFrameDialog: React.FC<AddFrameDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [frameName, setFrameName] = useState('');

  const handleAdd = () => {
    if (frameName.trim()) {
      onAdd(frameName.trim());
      setFrameName('');
      onClose();
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Добавление фрейма"
      onClose={onClose}
      actions={<Button onClick={handleAdd}>Добавить</Button>}
    >
      <TextField
        label="Наименование фрейма"
        value={frameName}
        onChange={(e) => setFrameName(e.target.value)}
        fullWidth
      />
    </BaseDialog>
  );
};

export default AddFrameDialog;
