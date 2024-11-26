'use client';

import React from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface FrameButtonProps {
  name: string;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const FrameButton: React.FC<FrameButtonProps> = ({
  name,
  isActive,
  onSelect,
  onEdit,
  onDelete,
}) => (
  <Box
    sx={{
      padding: 1,
      cursor: 'pointer',
      bgcolor: isActive ? 'primary.main' : 'grey.200',
      color: isActive ? 'white' : 'black',
      borderRadius: 1,
      textAlign: 'center',
      minWidth: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1,
    }}
  >
    <Box sx={{ flexGrow: 1 }} onClick={onSelect}>
      <Typography variant="body2" noWrap>
        {name}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Tooltip title="Редактировать">
        <IconButton size="small" onClick={onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Удалить">
        <IconButton size="small" onClick={onDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
);

export default FrameButton;
