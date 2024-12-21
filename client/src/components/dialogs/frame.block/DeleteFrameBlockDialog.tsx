'use client';

import React from 'react';
import { Typography, Button } from '@mui/material';
import BaseDialog from '../BaseDialog';

interface DeleteFrameBlockDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  frameBlockId: number;
}

const DeleteFrameBlockDialog: React.FC<DeleteFrameBlockDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  frameBlockId,
}) => {
  const handleDelete = () => {
    onDelete(frameBlockId);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Удаление фрейм блока"
      onClose={onClose}
      actions={<Button onClick={handleDelete}>Удалить</Button>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить этот фрейм блок?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteFrameBlockDialog;
