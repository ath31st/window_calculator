import { TableButton } from '@/types/api';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import EditTableButtonDialog from '../dialogs/table.button/EditTableButtonDialog';
import DeleteTableButtonDialog from '../dialogs/table.button/DeleteTableButtonDialog';

interface TableButtonEditDeleteButtonsProps {
  currentTableButton: TableButton;
  onEdit: (button: TableButton) => void;
  onDelete: (id: number) => void;
}

const TableButtonEditDeleteButtons: React.FC<
  TableButtonEditDeleteButtonsProps
> = ({ currentTableButton, onEdit, onDelete }) => {
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

      <EditTableButtonDialog
        isOpen={dialogType === 'edit'}
        onClose={closeDialog}
        onUpdate={onEdit}
        currentTableButton={currentTableButton}
      />

      <DeleteTableButtonDialog
        isOpen={dialogType === 'delete'}
        onClose={closeDialog}
        onDelete={onDelete}
        tableButtonId={currentTableButton.id}
      />
    </Box>
  );
};

export default TableButtonEditDeleteButtons;
