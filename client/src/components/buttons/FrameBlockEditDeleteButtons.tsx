import { FrameBlock } from '@/types/api';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteFrameBlockDialog from '../dialogs/frame.block/DeleteFrameBlockDialog';
import EditFrameBlockDialog from '../dialogs/frame.block/EditFrameBlockDialog';

interface FrameBlockEditDeleteButtonsProps {
  id: number;
  currentFrameBlock: FrameBlock;
  onEdit: (block: FrameBlock) => void;
  onDelete: (id: number) => void;
}

export const FrameBlockEditDeleteButtons: React.FC<
  FrameBlockEditDeleteButtonsProps
> = ({ id, currentFrameBlock, onEdit, onDelete }) => {
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

      <EditFrameBlockDialog
        isOpen={dialogType === 'edit'}
        onClose={closeDialog}
        onUpdate={onEdit}
        currentFrameBlock={currentFrameBlock}
      />

      <DeleteFrameBlockDialog
        isOpen={dialogType === 'delete'}
        onClose={closeDialog}
        onDelete={onDelete}
        frameBlockId={id}
      />
    </Box>
  );
};
