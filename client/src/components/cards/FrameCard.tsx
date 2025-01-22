'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import FrameBlockList from '@/components/lists/FrameBlockList';
import AddFrameBlockDialog from '@/components/dialogs/frame.block/AddFrameBlockDialog';
import { FrameBlock, FrameBlockFull, NewFrameBlock } from '@/types/api';
import CommonAddIconButton from '../icons/CommonAddIconButton';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';

interface FrameCardProps {
  activeFrameId: number | null;
  frameBlocksFull: FrameBlockFull[];
  onAdd: (frameBlock: NewFrameBlock) => void;
  onDelete: (id: number) => void;
  onEdit: (block: FrameBlock) => void;
  isEditMode: boolean;
}

const FrameCard: React.FC<FrameCardProps> = ({
  activeFrameId,
  frameBlocksFull,
  onAdd,
  onDelete,
  onEdit,
  isEditMode,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{}}>
      <FrameBlockList
        frameBlocksFull={frameBlocksFull}
        deleteFrameBlock={onDelete}
        updateFrameBlock={onEdit}
        isEditMode={isEditMode}
      />

      {activeFrameId && (
        <CommonAddIconButton
          isEditMode={isEditMode}
          customIcon={<ViewAgendaOutlinedIcon />}
          onAddClick={() => setDialogOpen(true)}
        />
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
