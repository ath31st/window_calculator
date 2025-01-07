import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import EditFrameDialog from '../dialogs/frame/EditFrameDialog';
import DeleteFrameDialog from '../dialogs/frame/DeleteFrameDialog';

interface FrameEditDeleteButtonsProps {
  id: number;
  currentName: string;
  onEdit: (name: string) => void;
  onDelete: (id: number) => void;
}

export const FrameEditDeleteButtons: React.FC<FrameEditDeleteButtonsProps> = ({
  id,
  currentName,
  onEdit,
  onDelete,
}) => {
  const [dialogType, setDialogType] = useState<'edit' | 'delete' | null>(null);

  const openEditDialog = () => setDialogType('edit');
  const openDeleteDialog = () => setDialogType('delete');
  const closeDialog = () => setDialogType(null);

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={openEditDialog}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={openDeleteDialog}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <EditFrameDialog
        isOpen={dialogType === 'edit'}
        onClose={closeDialog}
        onUpdate={onEdit}
        currentName={currentName}
      />

      <DeleteFrameDialog
        isOpen={dialogType === 'delete'}
        onClose={closeDialog}
        onDelete={onDelete}
        frameId={id}
      />
    </Box>
  );
};
