import { Box } from '@mui/material';
import { BlockTable, BlockTableFull } from '@/types/api';
import BlockTableCard from '../cards/BlockTableCard';

interface BlockTableListProps {
  blockTablesFull: BlockTableFull[];
  deleteBlockTable: (id: number) => void;
  updateBlockTable: (table: BlockTable) => void;
}

const BlockTableList: React.FC<BlockTableListProps> = ({
  blockTablesFull,
  deleteBlockTable,
  updateBlockTable,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        overflowY: 'auto',
      }}
    >
      {blockTablesFull.map((table) => (
        <BlockTableCard
          key={table.id}
          table={table}
          onEdit={updateBlockTable}
          onDelete={deleteBlockTable}
        />
      ))}
    </Box>
  );
};

export default BlockTableList;
