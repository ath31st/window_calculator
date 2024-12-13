'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { UpdateUser, User } from '@/types/api';

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
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Изменить пользователя</Typography>
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
            labelId="role-label"
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
          >
            <MenuItem value={2}>Пользователь</MenuItem>
            <MenuItem value={1}>Администратор</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          }
          label="Активен"
        />

        <Button variant="contained" onClick={handleUpdate}>
          Изменить
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditUserDialog;
