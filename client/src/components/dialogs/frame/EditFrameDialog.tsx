'use client';

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import BaseDialog from '../BaseDialog';

interface EditFrameDialogProps {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
  onUpdate: (name: string) => void;
}

const EditFrameDialog: React.FC<EditFrameDialogProps> = ({
  isOpen,
  currentName,
  onClose,
  onUpdate,
}) => {
  const [frameName, setFrameName] = useState('');

  const handleUpdate = () => {
    if (frameName.trim()) {
      onUpdate(frameName.trim());
      setFrameName('');
      onClose();
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Изменение фрейма"
      onClose={onClose}
      actions={<Button onClick={handleUpdate}>Изменить</Button>}
    >
      <TextField
        label={currentName}
        value={frameName}
        onChange={(e) => setFrameName(e.target.value)}
        fullWidth
      />
    </BaseDialog>
  );
};

export default EditFrameDialog;
