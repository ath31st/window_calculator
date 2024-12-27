'use client';

import React from 'react';
import { Typography } from '@mui/material';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

interface DeleteFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  frameId: number;
}

const DeleteFrameDialog: React.FC<DeleteFrameDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
  frameId,
}) => {
  const handleDelete = () => {
    onDelete(frameId);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Удаление фрейма"
      onClose={onClose}
      actions={<CommonButton onClick={handleDelete}>Удалить</CommonButton>}
    >
      <Typography variant="body2">
        Вы уверены, что хотите удалить этот фрейм?
      </Typography>
    </BaseDialog>
  );
};

export default DeleteFrameDialog;
