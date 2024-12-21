'use client';

import React from 'react';
import { Typography, Button } from '@mui/material';
import BaseDialog from '../BaseDialog';

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
      actions={<Button onClick={handleDelete}>Удалить</Button>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить эту позицию?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteCartItemDialog;
