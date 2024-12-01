import { Box } from '@mui/material';
import FrameBlockCard from '../cards/FrameBlockCard';
import { FrameBlock, FrameBlockFull } from '@/types/api';

interface FrameBlockListProps {
  frameBlocksFull: FrameBlockFull[];
  deleteFrameBlock: (id: number) => void;
  updateFrameBlock: (block: FrameBlock) => void;
}

const FrameBlockList: React.FC<FrameBlockListProps> = ({
  frameBlocksFull,
  deleteFrameBlock,
  updateFrameBlock,
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
      {frameBlocksFull.map((block) => (
        <FrameBlockCard
          key={block.id}
          block={block}
          onEdit={updateFrameBlock}
          onDelete={deleteFrameBlock}
        />
      ))}
    </Box>
  );
};

export default FrameBlockList;
