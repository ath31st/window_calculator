import { ButtonType } from '@/constants/button.type';
import { TableButton } from '@/types/api';
import { Box, Card, CardContent, Typography } from '@mui/material';
import TableButtonEditDeleteButtons from '../buttons/TableButtonEditDeleteButtons';
import theme from '@/app/_theme/theme';

interface TableButtonCardProps {
  button: TableButton;
  buttonType: ButtonType;
  onEdit: (button: TableButton) => void;
  onDelete: (id: number) => void;
}

const TableButtonCard: React.FC<TableButtonCardProps> = ({
  button,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        width: '100%',
        mb: 2,
        position: 'relative',
        boxShadow: 4,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {button.name}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {button.value}
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
            <TableButtonEditDeleteButtons
              currentTableButton={button}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TableButtonCard;
