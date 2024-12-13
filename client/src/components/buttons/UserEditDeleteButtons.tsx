import { UpdateUser, User } from '@/types/api';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteUserDialog from '../dialogs/user/DeleteUserDialog';
import EditUserDialog from '../dialogs/user/EditUserDialog';

interface UserEditDeleteButtonsProps {
  id: number;
  currentUser: User;
  onEdit: (user: UpdateUser) => void;
  onDelete: (id: number) => void;
}

export const UserEditDeleteButtons: React.FC<UserEditDeleteButtonsProps> = ({
  id,
  currentUser,
  onEdit,
  onDelete,
}) => {
  const [dialogType, setDialogType] = useState<'edit' | 'delete' | null>(null);

  const openEditDialog = () => setDialogType('edit');
  const openDeleteDialog = () => setDialogType('delete');
  const closeDialog = () => setDialogType(null);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton size="small" onClick={openEditDialog}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={openDeleteDialog}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <EditUserDialog
        isOpen={dialogType === 'edit'}
        onClose={closeDialog}
        onUpdate={onEdit}
        currentUser={currentUser}
      />

      <DeleteUserDialog
        isOpen={dialogType === 'delete'}
        onClose={closeDialog}
        onDelete={onDelete}
        userId={id}
      />
    </Box>
  );
};
