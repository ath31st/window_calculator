import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FrameBlock, FrameBlockFull } from '@/types/api';
import { FrameBlockEditDeleteButtons } from '@/components/buttons/FrameBlockEditDeleteButtons';

interface FrameBlockActionsProps {
  isEditMode: boolean;
  block: FrameBlockFull;
  onEdit: (block: FrameBlock) => void;
  onDelete: (id: number) => void;
  setDialogOpen: (open: boolean) => void;
}

const FrameBlockActions: React.FC<FrameBlockActionsProps> = ({
  isEditMode,
  block,
  onEdit,
  onDelete,
  setDialogOpen,
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
      <IconButton onClick={() => setDialogOpen(true)}>
        <AddIcon />
      </IconButton>
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
