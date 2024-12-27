'use client';

import React from 'react';
import { Typography } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

interface DeleteBlockTableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  blockTableId: number;
}

const DeleteBlockTableDialog: React.FC<DeleteBlockTableDialogProps> = ({
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
      title="Удаление таблицы блока"
      onClose={onClose}
      actions={<CommonButton onClick={handleDelete}>Удалить</CommonButton>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить эту таблицу блока?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteBlockTableDialog;
