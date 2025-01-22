'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useFrameStore } from '@/stores/frame.store';
import FrameButton from './buttons/FrameButton';
import AddFrameDialog from './dialogs/frame/AddFrameDialog';
import { useEditModeStore } from '@/stores/edit.mode.store';
import theme from '@/app/_theme/theme';
import CommonAddIconButton from './icons/CommonAddIconButton';
import ViewArrayOutlinedIcon from '@mui/icons-material/ViewArrayOutlined';

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
  const [isLoading, setIsLoading] = useState(false);
  const [targetFrameId, setTargetFrameId] = useState<number | null>(null);

  useEffect(() => {
    fetchFrames();
  }, [fetchFrames]);

  const handleFrameSelect = async (id: number) => {
    if (activeFrameId !== id) {
      setTargetFrameId(id);
      setIsLoading(true);
      try {
        await fetchFrameFull(id);
      } catch (error) {
        console.error('Ошибка при загрузке фрейма:', error);
      } finally {
        setIsLoading(false);
        setTargetFrameId(null);
      }
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
          alignItems: 'center',
          maxWidth: '100%',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {frames
          .sort((a, b) => a.id - b.id)
          .map((frame) => (
            <FrameButton
              key={frame.id}
              id={frame.id}
              name={frame.name}
              isActive={activeFrameId === frame.id}
              onSelect={() => handleFrameSelect(frame.id)}
              onEdit={(newName) => updateFrame(frame.id, newName)}
              onDelete={() => deleteFrame(frame.id)}
              isEditMode={isEditMode}
              isLoading={isLoading}
              isTargetFrame={targetFrameId === frame.id}
            />
          ))}

        <CommonAddIconButton
          isEditMode={isEditMode}
          customIcon={<ViewArrayOutlinedIcon />}
          onAddClick={() => setDialogOpen(true)}
        />
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
