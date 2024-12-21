import { NewUser } from '@/types/api';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import BaseDialog from '../BaseDialog';

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: NewUser) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(2);

  const handleAdd = () => {
    if (email.trim() && password.trim()) {
      const newUser: NewUser = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        role: role,
      };
      onAdd(newUser);
      setEmail('');
      setName('');
      setPassword('');
      setRole(2);
      onClose();
    }
  };
  return (
    <BaseDialog
      isOpen={isOpen}
      title="Добавление пользователя"
      onClose={onClose}
      actions={<Button onClick={handleAdd}>Добавить</Button>}
    >
      <TextField
        label="Имя пользователя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <TextField
        label="Email пользователя"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Введите пароль для пользователя"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="role-label">Роль</InputLabel>
        <Select
          labelId="role-label"
          value={role}
          onChange={(e) => setRole(Number(e.target.value))}
          label="Роль"
        >
          <MenuItem value={2}>Пользователь</MenuItem>
          <MenuItem value={1}>Администратор</MenuItem>
        </Select>
      </FormControl>
    </BaseDialog>
  );
};

export default AddUserDialog;
