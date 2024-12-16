'use client';

import AddIcon from '@mui/icons-material/Add';
import Header from '@/components/Header';
import CommonLayout from '@/components/layouts/CommonLayout';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';
import AddUserDialog from '@/components/dialogs/user/AddUserDialog';
import UserList from '@/components/lists/UserList';
import { IconButton } from '@mui/material';
import RoleGuard from '@/components/RoleGuard';

const Users: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { addUser, updateUser, fetchUsers, deleteUser, users } = useUserStore();
  const roles = ['ADMIN'];

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <RoleGuard roles={roles}>
      <CommonLayout>
        <Header />
        <h1>Users</h1>

        <UserList users={users} onEdit={updateUser} onDelete={deleteUser} />

        <IconButton onClick={() => setDialogOpen(true)}>
          <AddIcon />
        </IconButton>

        <AddUserDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onAdd={addUser}
        />
      </CommonLayout>
    </RoleGuard>
  );
};

export default Users;
