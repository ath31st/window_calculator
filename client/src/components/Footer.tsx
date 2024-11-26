'use client';

import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFrameStore } from '@/stores/frame.store';
import FrameButton from './buttons/FrameButton';
import AddFrameDialog from './dialogs/AddFrameDialog';

const Footer: React.FC = () => {
  const {
    frames,
    activeFrameId,
    fetchFrames,
    addFrame,
    deleteFrame,
    updateFrame,
    setActiveFrame,
  } = useFrameStore();
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchFrames();
  }, [fetchFrames]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        bgcolor: 'background.paper',
        borderTop: '2px solid',
        borderColor: 'divider',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 1,
          maxWidth: '100%',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {frames.map((frame) => (
          <FrameButton
            key={frame.id}
            id={frame.id}
            name={frame.name}
            isActive={activeFrameId === frame.id}
            onSelect={() => setActiveFrame(frame.id)}
            onEdit={(newName) => updateFrame(frame.id, newName)}
            onDelete={() => deleteFrame(frame.id)}
          />
        ))}
        <IconButton onClick={() => setDialogOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>

      <AddFrameDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={(name) => addFrame(name)}
      />
    </Box>
  );
};

export default Footer;
