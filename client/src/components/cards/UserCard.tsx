import { UpdateUser, User } from '@/types/api';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { UserEditDeleteButtons } from '../buttons/UserEditDeleteButtons';

interface UserCardProps {
  user: User;
  onEdit: (user: UpdateUser) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <Card sx={{ width: '100%', position: 'relative', boxShadow: 4  }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flexBasis: '30%' }}>
            <Typography variant="h6">Имя:</Typography>
            <Typography variant="body2">{user.name}</Typography>
          </Box>

          <Box sx={{ flexBasis: '70%' }}>
            <Typography variant="body2">Email: {user.email}</Typography>
            <Typography variant="body2">
              Роль: {user.role === 1 ? 'Администратор' : 'Пользователь'}
            </Typography>
            <Typography variant="body2">
              Статус: {user.isActive ? 'Активен' : 'Не активен'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
          }}
        >
          <UserEditDeleteButtons
            id={user.id}
            currentUser={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
