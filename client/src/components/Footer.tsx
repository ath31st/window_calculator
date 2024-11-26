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

const Footer: React.FC = () => {
  const { frames, activeFrameId, addFrame, setActiveFrame } = useFrameStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newFrameName, setNewFrameName] = useState('');

  const handleAddFrame = () => {
    if (newFrameName.trim()) {
      addFrame(newFrameName.trim());
      setNewFrameName('');
      setDialogOpen(false);
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
          <Box
            key={frame.id}
            onClick={() => setActiveFrame(frame.id)}
            sx={{
              padding: 1,
              cursor: 'pointer',
              bgcolor: activeFrameId === frame.id ? 'primary.main' : 'grey.200',
              color: activeFrameId === frame.id ? 'white' : 'black',
              borderRadius: 1,
              textAlign: 'center',
              minWidth: 100,
            }}
          >
            <Typography variant="body2">{frame.name}</Typography>
          </Box>
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
