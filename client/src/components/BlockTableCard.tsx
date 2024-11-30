import { BlockTable, BlockTableFull } from '@/types/api';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { BlockTableEditDeleteButtons } from './buttons/BlockTableEditDeleteButtons';

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
  return (
    <Card sx={{ width: '100%', mb: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {table.name}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {table.buttonType}
          </Typography>

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
