import { NewUser } from '@/types/api';
import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

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
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 300,
        }}
      >
        <Typography variant="h6">Добавить пользователя</Typography>
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
        <Select
          value={role}
          onChange={(e) => setRole(Number(e.target.value))}
          fullWidth
          displayEmpty
        >
          <MenuItem value={2}>Пользователь</MenuItem>
          <MenuItem value={1}>Администратор</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleAdd}>
          Добавить
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddUserDialog;
