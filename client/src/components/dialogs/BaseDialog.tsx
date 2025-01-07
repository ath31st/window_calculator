'use client';

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import theme from '@/app/_theme/theme';

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
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: theme.shape.borderRadius,
          outline: `1px solid ${theme.palette.background.default}`,
          outlineOffset: 8,
          boxShadow: `0 0 0 8px ${theme.palette.background.default}30`,
        },
      }}
      open={isOpen}
      onClose={onClose}
      disableRestoreFocus
    >
      <DialogTitle
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          paddingX: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'visible',
          minWidth: 250,
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
