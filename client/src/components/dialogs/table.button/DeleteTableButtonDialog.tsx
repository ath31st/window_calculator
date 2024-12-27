'use client';

import React from 'react';
import { Typography } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
      actions={<CommonButton onClick={handleDelete}>Удалить</CommonButton>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить эту кнопку?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteTableButtonDialog;
