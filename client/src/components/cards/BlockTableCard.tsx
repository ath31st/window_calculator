import { BlockTable, BlockTableFull } from '@/types/api';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { BlockTableEditDeleteButtons } from '../buttons/BlockTableEditDeleteButtons';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddTableButtonDialog from '../dialogs/table.button/AddTableButtonDialog';
import TableButtonList from '../lists/TableButtonList';
import { useTableButtonStore } from '@/stores/table.button.store';

interface BlockTableCardProps {
  table: BlockTableFull;
  onEdit: (table: BlockTable) => void;
  onDelete: (id: number) => void;
}

const BlockTableCard: React.FC<BlockTableCardProps> = ({
  table,
  onEdit,
  onDelete,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { addTableButton, updateTableButton, deleteTableButton, tableButtons } =
    useTableButtonStore();

  return (
    <Card sx={{ width: '100%', mb: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {table.name}
          </Typography>

          <TableButtonList
            tableButtons={tableButtons.filter(
              (tb) => tb.blockTableId === table.id,
            )}
            updateTableButton={(tableButton) => updateTableButton(tableButton)}
            deleteTableButton={(id) => deleteTableButton(id)}
            buttonType={table.buttonType}
          />

          <Typography variant="body2" sx={{ mb: 2 }}>
            {table.buttonType}
          </Typography>

          <Box>
            <IconButton onClick={() => setDialogOpen(true)}>
              <AddIcon />
            </IconButton>
          </Box>

          <AddTableButtonDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={(tableButton) => addTableButton(tableButton)}
            blockTableId={table.id}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <BlockTableEditDeleteButtons
              id={table.id}
              currentBlockTable={table}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlockTableCard;
