'use client';

import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { UpdateUser, User } from '@/types/api';
import BaseDialog from '../BaseDialog';
import CommonButton from '@/components/buttons/CommonButton';

interface EditUserDialogProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
  onUpdate: (updatedUser: UpdateUser) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  currentUser,
  onClose,
  onUpdate,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(false);
  const [role, setRole] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setRole(currentUser.role);
      setActive(currentUser.isActive);
    }
  }, [isOpen, currentUser]);

  const handleUpdate = () => {
    const updatedUser: UpdateUser = {
      id: currentUser.id,
      name: name.trim(),
      email: email.trim(),
      isActive: active,
      role,
    };
    onUpdate(updatedUser);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Изменение пользователя"
      onClose={onClose}
      actions={<CommonButton onClick={handleUpdate}>Изменить</CommonButton>}
    >
      <TextField
        label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="role-label">Роль</InputLabel>
        <Select
          id="role-select"
          labelId="role-label"
          name="role-select"
          value={role}
          onChange={(e) => setRole(Number(e.target.value))}
          label="Роль"
        >
          <MenuItem value={2}>Пользователь</MenuItem>
          <MenuItem value={1}>Администратор</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            id="active-switch"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        }
        label="Активен"
      />
    </BaseDialog>
  );
};

export default EditUserDialog;
