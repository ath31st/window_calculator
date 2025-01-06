'use client';

import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFrameStore } from '@/stores/frame.store';
import FrameButton from './buttons/FrameButton';
import AddFrameDialog from './dialogs/frame/AddFrameDialog';
import { useEditModeStore } from '@/stores/edit.mode.store';
import theme from '@/app/_theme/theme';

const Footer: React.FC = () => {
  const {
    frames,
    activeFrameId,
    fetchFrames,
    addFrame,
    deleteFrame,
    updateFrame,
    fetchFrameFull,
  } = useFrameStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { isEditMode } = useEditModeStore();

  useEffect(() => {
    fetchFrames();
  }, [fetchFrames]);

  const handleFrameSelect = async (id: number) => {
    if (activeFrameId !== id) {
      fetchFrameFull(id);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        bgcolor: `${theme.palette.background.paper}`,
        borderTop: '2px solid',
        borderColor: theme.palette.background.default,
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
            onSelect={() => handleFrameSelect(frame.id)}
            onEdit={(newName) => updateFrame(frame.id, newName)}
            onDelete={() => deleteFrame(frame.id)}
            isEditMode={isEditMode}
          />
        ))}

        {isEditMode && (
          <IconButton onClick={() => setDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        )}
        
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
