'use client';

import React from 'react';
import { Typography } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  userId: number;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  userId,
}) => {
  const handleDelete = () => {
    onDelete(userId);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Удаление пользователя"
      onClose={onClose}
      actions={<CommonButton onClick={handleDelete}>Удалить</CommonButton>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить этого пользователя?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteUserDialog;
