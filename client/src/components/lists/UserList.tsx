import { UpdateUser, User } from '@/types/api';
import UserCard from '../cards/UserCard';
import { Box } from '@mui/material';

interface UserListProps {
  users: User[];
  onEdit: (user: UpdateUser) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 1,
        overflowY: 'auto',
      }}
    >
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};

export default UserList;
