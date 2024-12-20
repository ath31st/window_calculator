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
  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const validate = () => {
    const newErrors = {
      oldPassword: !oldPassword.trim(),
      newPassword: !newPassword.trim(),
    };
    setErrors(newErrors);
    return !newErrors.oldPassword && !newErrors.newPassword;
  };

  const handleChangePassword = () => {
    if (!validate()) {
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
    setErrors({ oldPassword: false, newPassword: false });
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
          error={errors.oldPassword} 
          helperText={errors.oldPassword ? 'Введите текущий пароль' : ''}
          required
        />
        <TextField
          margin="dense"
          id="newPassword"
          label="Новый пароль"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          helperText={errors.newPassword ? 'Введите новый пароль' : ''}
          required
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
