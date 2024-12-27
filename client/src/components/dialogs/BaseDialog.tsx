'use client';

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import BorderedContainer from '../containers/BorderedContainer';

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
      <BorderedContainer>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent
          sx={{
            padding: 3,
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
      </BorderedContainer>
    </Dialog>
  );
};

export default BaseDialog;
