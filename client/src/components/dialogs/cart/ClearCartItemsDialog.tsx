'use client';

import React from 'react';
import { Typography } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

interface ClearCartItemsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

const ClearCartItemsDialog: React.FC<ClearCartItemsDialogProps> = ({
  isOpen,
  onClose,
  onClear,
}) => {
  const handleClear = () => {
    onClear();
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Очистка корзины"
      onClose={onClose}
      actions={<CommonButton onClick={handleClear}>Удалить все</CommonButton>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите очистить корзину?
      </Typography>
    </BaseDialog>
  );
};

export default ClearCartItemsDialog;
