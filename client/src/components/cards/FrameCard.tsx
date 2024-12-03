'use client';

import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import FrameBlockList from '@/components/lists/FrameBlockList';
import AddFrameBlockDialog from '@/components/dialogs/frame.block/AddFrameBlockDialog';
import { FrameBlock, FrameBlockFull, NewFrameBlock } from '@/types/api';

interface FrameCardProps {
  activeFrameId: number | null;
  frameBlocksFull: FrameBlockFull[];
  onAdd: (frameBlock: NewFrameBlock) => void;
  onDelete: (id: number) => void;
  onEdit: (block: FrameBlock) => void;
}

const FrameCard: React.FC<FrameCardProps> = ({
  activeFrameId,
  frameBlocksFull,
  onAdd,
  onDelete,
  onEdit,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{}}>
      <FrameBlockList
        frameBlocksFull={frameBlocksFull}
        deleteFrameBlock={onDelete}
        updateFrameBlock={onEdit}
      />

      {activeFrameId && (
        <IconButton onClick={() => setDialogOpen(true)}>
          <AddIcon />
        </IconButton>
      )}

      <AddFrameBlockDialog
        frameId={activeFrameId || 0}
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={onAdd}
      />
    </Box>
  );
};

export default FrameCard;
