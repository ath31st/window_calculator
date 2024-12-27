'use client';

import React from 'react';
import { Typography } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

interface DeleteCartItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  blockTableId: number;
}

const DeleteCartItemDialog: React.FC<DeleteCartItemDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  blockTableId,
}) => {
  const handleDelete = () => {
    onDelete(blockTableId);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Удаление позиции"
      onClose={onClose}
      actions={<CommonButton onClick={handleDelete}>Удалить</CommonButton>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить эту позицию?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteCartItemDialog;
