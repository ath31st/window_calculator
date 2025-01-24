'use client';

import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';
import { Frame } from '@/types/api';

interface EditFrameDialogProps {
  isOpen: boolean;
  currentFrame: Frame;
  onClose: () => void;
  onUpdate: (updFrame: Frame) => void;
}

const EditFrameDialog: React.FC<EditFrameDialogProps> = ({
  isOpen,
  currentFrame,
  onClose,
  onUpdate,
}) => {
  const [frameName, setFrameName] = useState(currentFrame.name);
  const [order, setOrder] = useState<number>(currentFrame.order);

  useEffect(() => {
    setFrameName(currentFrame.name);
    setOrder(currentFrame.order);
  }, [currentFrame]);

  const handleUpdate = () => {
    if (frameName.trim() && order >= 0 && order <= 999) {
      const updatedFrame: Frame = {
        ...currentFrame,
        name: frameName.trim(),
        order: order,
      };
      onUpdate(updatedFrame);
      onClose();
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Изменение фрейма"
      onClose={onClose}
      actions={<CommonButton onClick={handleUpdate}>Изменить</CommonButton>}
    >
      <TextField
        label={frameName}
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

export default EditFrameDialog;
