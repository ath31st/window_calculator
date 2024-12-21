'use client';

import React from 'react';
import { Typography, Button } from '@mui/material';
import BaseDialog from '../BaseDialog';

interface DeleteTableButtonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  tableButtonId: number;
}

const DeleteTableButtonDialog: React.FC<DeleteTableButtonDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  tableButtonId,
}) => {
  const handleDelete = () => {
    onDelete(tableButtonId);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Удаление кнопки"
      onClose={onClose}
      actions={<Button onClick={handleDelete}>Удалить</Button>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить эту кнопку?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteTableButtonDialog;
