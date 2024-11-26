'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFrameStore } from '@/stores/frame.store';
import FrameButton from './buttons/FrameButton';

const Footer: React.FC = () => {
  const {
    frames,
    activeFrameId,
    addFrame,
    deleteFrame,
    updateFrame,
    setActiveFrame,
  } = useFrameStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newFrameName, setNewFrameName] = useState('');

  const handleAddFrame = () => {
    if (newFrameName.trim()) {
      addFrame(newFrameName.trim());
      setNewFrameName('');
      setDialogOpen(false);
    }
  };

  const handleEditFrame = (id: number) => {
    const newName = prompt('Введите новое название фрейма');
    if (newName?.trim()) {
      updateFrame(id, newName.trim());
    }
  };

  const handleDeleteFrame = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить фрейм?')) {
      deleteFrame(id);
    }
  };

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
            name={frame.name}
            isActive={activeFrameId === frame.id}
            onSelect={() => setActiveFrame(frame.id)}
            onEdit={() => handleEditFrame(frame.id)}
            onDelete={() => handleDeleteFrame(frame.id)}
          />
        ))}
        <IconButton onClick={() => setDialogOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <Box
          sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography variant="h6">Добавить фрейм</Typography>
          <TextField
            label="Название фрейма"
            value={newFrameName}
            onChange={(e) => setNewFrameName(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddFrame}>
            Добавить
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Footer;
