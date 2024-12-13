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
    <Card sx={{ width: '100%', position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          <Typography variant="body2">{user.role}</Typography>
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
