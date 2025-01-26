'use client';

import Header from '@/components/Header';
import CommonLayout from '@/components/layouts/CommonLayout';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';
import AddUserDialog from '@/components/dialogs/user/AddUserDialog';
import UserList from '@/components/lists/UserList';
import RoleGuard from '@/components/RoleGuard';
import PageHeader from '@/components/texts/PageHeader';
import BorderedContainer from '@/components/containers/BorderedContainer';
import BorderedBackgraundedContainer from '@/components/containers/BorderedBackgraundedContainer';
import CommonAddIconButton from '@/components/icons/CommonAddIconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';

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
        <BorderedContainer>
          <BorderedBackgraundedContainer>
            <PageHeader title="Список пользователей" />

            <UserList users={users} onEdit={updateUser} onDelete={deleteUser} />
            <Box sx={{ paddingX: 2 }}>
              <CommonAddIconButton
                isEditMode={true}
                customIcon={<PersonIcon />}
                onAddClick={() => setDialogOpen(true)}
              />
            </Box>
          </BorderedBackgraundedContainer>

          <AddUserDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={addUser}
          />
        </BorderedContainer>
      </CommonLayout>
    </RoleGuard>
  );
};

export default Users;
