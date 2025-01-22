import { Box } from '@mui/material';
import { FrameBlock, FrameBlockFull } from '@/types/api';
import { FrameBlockEditDeleteButtons } from '@/components/buttons/FrameBlockEditDeleteButtons';

interface FrameBlockActionsProps {
  isEditMode: boolean;
  block: FrameBlockFull;
  onEdit: (block: FrameBlock) => void;
  onDelete: (id: number) => void;
}

const FrameBlockActions: React.FC<FrameBlockActionsProps> = ({
  isEditMode,
  block,
  onEdit,
  onDelete,
}) => {
  if (!isEditMode) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        display: 'flex',
        gap: 1,
      }}
    >
      <FrameBlockEditDeleteButtons
        id={block.id}
        currentFrameBlock={block}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Box>
  );
};

export default FrameBlockActions;
