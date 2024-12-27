import { ChangePassword } from '@/types/api';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

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
    <BaseDialog
      isOpen={isOpen}
      title="Изменение пароля"
      onClose={handleClose}
      actions={
        <>
          <CommonButton onClick={handleClose}>Отменить</CommonButton>
          <CommonButton onClick={handleChangePassword}>Изменить</CommonButton>
        </>
      }
    >
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
    </BaseDialog>
  );
};

export default ChangePasswordDialog;
