'use client';

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface BaseDialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
  contentStyles?: object;
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  isOpen,
  title,
  onClose,
  children,
  actions,
  contentStyles,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} disableRestoreFocus>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'visible',
          minWidth: 300,
          ...contentStyles,
        }}
      >
        {children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default BaseDialog;
