import { ChangePassword } from '@/types/api';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface ChangePasswordDialogProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: (changePassword: ChangePassword) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  userId,
  isOpen,
  onClose,
  onChangePassword,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      alert('Both fields are required');
      return;
    }

    onChangePassword({
      id: userId,
      oldPassword,
      newPassword,
    });

    setOldPassword('');
    setNewPassword('');
    onClose();
  };

  const handleClose = () => {
    setOldPassword('');
    setNewPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Изменение пароля</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="oldPassword"
          label="Текущий пароль"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          id="newPassword"
          label="Новый пароль"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отменить</Button>
        <Button onClick={handleChangePassword}>Изменить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
