import { BlockTable, BlockTableFull } from '@/types/api';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { BlockTableEditDeleteButtons } from '../buttons/BlockTableEditDeleteButtons';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddTableButtonDialog from '../dialogs/table.button/AddTableButtonDialog';
import TableButtonList from '../lists/TableButtonList';
import { useTableButtonStore } from '@/stores/table.button.store';
import { ButtonType } from '@/constants/button.type';
import theme from '@/app/_theme/theme';

interface BlockTableCardProps {
  table: BlockTableFull;
  onEdit: (table: BlockTable) => void;
  onDelete: (id: number) => void;
  onChange: (buttonType: ButtonType, id: number, value: number) => void;
  isEditMode: boolean;
}

const BlockTableCard: React.FC<BlockTableCardProps> = ({
  table,
  onEdit,
  onDelete,
  onChange,
  isEditMode,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { addTableButton, updateTableButton, deleteTableButton, tableButtons } =
    useTableButtonStore();

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        border: 0,
        boxShadow: 0,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="body1"
            sx={{ mb: 1, borderBottom: '1px solid var(--color-primary)' }}
          >
            {table.name}
          </Typography>

          <TableButtonList
            tableId={table.id}
            tableButtons={tableButtons.filter(
              (tb) => tb.blockTableId === table.id,
            )}
            updateTableButton={(tableButton) => updateTableButton(tableButton)}
            deleteTableButton={(id) => deleteTableButton(id)}
            buttonType={table.buttonType}
            onChange={onChange}
            isEditMode={isEditMode}
          />

          {isEditMode && (
            <Box>
              <IconButton onClick={() => setDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </Box>
          )}

          <AddTableButtonDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={(tableButton) => addTableButton(tableButton)}
            blockTableId={table.id}
          />

          {isEditMode && (
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
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlockTableCard;
