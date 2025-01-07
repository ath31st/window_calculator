import { BlockTable } from '@/types/api';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteBlockTableDialog from '../dialogs/block.table/DeleteBlockTableDialog';
import EditBlockTableDialog from '../dialogs/block.table/EditBlockTableDialog';

interface BlockTableEditDeleteButtonsProps {
  id: number;
  currentBlockTable: BlockTable;
  onEdit: (table: BlockTable) => void;
  onDelete: (id: number) => void;
}

export const BlockTableEditDeleteButtons: React.FC<
  BlockTableEditDeleteButtonsProps
> = ({ id, currentBlockTable, onEdit, onDelete }) => {
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

      <EditBlockTableDialog
        isOpen={dialogType === 'edit'}
        onClose={closeDialog}
        onUpdate={onEdit}
        currentBlockTable={currentBlockTable}
      />

      <DeleteBlockTableDialog
        isOpen={dialogType === 'delete'}
        onClose={closeDialog}
        onDelete={onDelete}
        blockTableId={id}
      />
    </Box>
  );
};
