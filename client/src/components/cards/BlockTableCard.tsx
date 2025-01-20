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
import TableIdIcon from '../icons/TableIdIcon';

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
      <CardContent
        sx={{
          padding: {
            xs: 0,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
          },
          paddingX: {
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
          },
          '&:last-child': {
            paddingBottom: {
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography
              variant="body1"
              sx={{ mb: 1, borderBottom: '1px solid var(--color-primary)' }}
            >
              {table.name}
            </Typography>
            {isEditMode && (
              <TableIdIcon id={table.id} type={table.buttonType} />
            )}
          </Box>

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
                top: { xs: 2, sm: 4, md: 8, lg: 8, xl: 8 },
                right: { xs: 4, sm: 4, md: 8, lg: 8, xl: 8 },
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
