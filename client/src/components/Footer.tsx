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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    fetchFrames();
  }, [fetchFrames]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

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
        bottom: isMounted ? 0 : '-100px',
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'bottom 0.5s ease-in-out',
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
          .sort((a, b) => {
            if (a.order !== b.order) {
              return a.order - b.order;
            }
            return a.name.localeCompare(b.name);
          })
          .map((frame) => (
            <FrameButton
              key={frame.id}
              currentFrame={frame}
              isActive={activeFrameId === frame.id}
              onSelect={handleFrameSelect}
              onEdit={updateFrame}
              onDelete={deleteFrame}
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
        onAdd={(newFrame) => addFrame(newFrame)}
      />
    </Box>
  );
};

export default Footer;
