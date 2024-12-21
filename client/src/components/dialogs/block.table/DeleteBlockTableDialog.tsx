'use client';

import React from 'react';
import { Typography, Button } from '@mui/material';
import BaseDialog from '../BaseDialog';

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
      title="Удаление блока"
      onClose={onClose}
      actions={<Button onClick={handleDelete}>Удалить</Button>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить эту таблицу?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteBlockTableDialog;
