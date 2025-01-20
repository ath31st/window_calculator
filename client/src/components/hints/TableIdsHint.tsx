import { Box, Typography } from '@mui/material';
import TableIdIcon from '../icons/TableIdIcon';

interface TableIdsHintProps {
  blockTables: { id: number; name: string; type: 'VALUE' | 'MODIFIER' }[];
}

const TableIdsHint: React.FC<TableIdsHintProps> = ({ blockTables }) => {
  return (
    <Box sx={{ marginTop: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Доступные id таблиц:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {blockTables
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((table) => (
              <TableIdIcon key={table.id} id={table.id} type={table.type} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TableIdsHint;
