'use client';

import React from 'react';
import { Typography } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
      title="Удаление блока фрейма"
      onClose={onClose}
      actions={<CommonButton onClick={handleDelete}>Удалить</CommonButton>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить этот блок фрейма?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteFrameBlockDialog;
