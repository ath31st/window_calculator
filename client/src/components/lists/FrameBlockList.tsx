import { Box } from '@mui/material';
import FrameBlockCard from '../cards/frame.block/FrameBlockCard';
import { FrameBlock, FrameBlockFull } from '@/types/api';

interface FrameBlockListProps {
  frameBlocksFull: FrameBlockFull[];
  deleteFrameBlock: (id: number) => void;
  updateFrameBlock: (block: FrameBlock) => void;
  isEditMode: boolean;
}

const FrameBlockList: React.FC<FrameBlockListProps> = ({
  frameBlocksFull,
  deleteFrameBlock,
  updateFrameBlock,
  isEditMode,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2 },
        overflowY: 'auto',
      }}
    >
      {frameBlocksFull
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((block) => (
          <FrameBlockCard
            key={block.id}
            block={block}
            onEdit={updateFrameBlock}
            onDelete={deleteFrameBlock}
            isEditMode={isEditMode}
          />
        ))}
    </Box>
  );
};

export default FrameBlockList;
