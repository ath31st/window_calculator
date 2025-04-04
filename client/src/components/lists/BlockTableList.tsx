import { Box } from '@mui/material';
import { BlockTable, BlockTableFull } from '@/types/api';
import BlockTableCard from '../cards/BlockTableCard';
import { ButtonType } from '@/constants/button.type';

interface BlockTableListProps {
  blockTablesFull: BlockTableFull[];
  deleteBlockTable: (id: number) => void;
  updateBlockTable: (table: BlockTable) => void;
  onChange: (buttonType: ButtonType, id: number, value: number) => void;
  isEditMode: boolean;
}

const BlockTableList: React.FC<BlockTableListProps> = ({
  blockTablesFull,
  deleteBlockTable,
  updateBlockTable,
  onChange,
  isEditMode,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(auto-fit, minmax(260px, 1fr))',
          sm: 'repeat(auto-fit, minmax(300px, 1fr))',
        },
        gap: 1,
        padding: 1,
        overflowY: 'auto',
      }}
    >
      {blockTablesFull
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((table) => (
          <BlockTableCard
            key={table.id}
            table={table}
            onEdit={updateBlockTable}
            onDelete={deleteBlockTable}
            onChange={onChange}
            isEditMode={isEditMode}
          />
        ))}
    </Box>
  );
};

export default BlockTableList;
