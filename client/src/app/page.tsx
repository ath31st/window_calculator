'use client';

import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useFrameBlockStore } from '@/stores/frame.block.store';
import FrameBlockList from '@/components/FrameBlockList';
import AddFrameBlockDialog from '@/components/dialogs/AddFrameBlockDialog';
import { useFrameStore } from '@/stores/frame.store';

const Home: React.FC = () => {
  const { addFrameBlock, frameBlocksFull, deleteFrameBlock, updateFrameBlock } =
    useFrameBlockStore();
  const { activeFrameId } = useFrameStore();
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{ padding: 2 }}>
      <FrameBlockList
        frameBlocksFull={frameBlocksFull}
        deleteFrameBlock={(id) => deleteFrameBlock(id)}
        updateFrameBlock={(block) => updateFrameBlock(block)}
      />
      <IconButton onClick={() => setDialogOpen(true)}>
        <AddIcon />
      </IconButton>

      <AddFrameBlockDialog
        frameId={activeFrameId || 0}
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={(newFrameBlock) => addFrameBlock(newFrameBlock)}
      />
    </Box>
  );
};

export default Home;
