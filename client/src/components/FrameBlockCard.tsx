import { Box, Typography, Card, CardContent, TextField } from '@mui/material';
import { FrameBlock, FrameBlockFull } from '@/types/api';
import { FrameBlockEditDeleteButtons } from './buttons/FrameBlockEditDeleteButtons';
import { useState } from 'react';

interface FrameBlockCardProps {
  block: FrameBlockFull;
  onEdit: (block: FrameBlock) => void;
  onDelete: (id: number) => void;
}

const FrameBlockCard: React.FC<FrameBlockCardProps> = ({
  block,
  onEdit,
  onDelete,
}) => {
  const [widthInMM, setWidthInMM] = useState<string>('');
  const [heightInMM, setHeightInMM] = useState<string>('');

  const handleDimensionChange = (key: 'width' | 'height', value: string) => {
    if (key === 'width') {
      setWidthInMM(value);
    } else if (key === 'height') {
      setHeightInMM(value);
    }
  };

  return (
    <Card sx={{ width: '100%', mb: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {block.name}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {block.description}
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {block.isWindowSizeEnabled
              ? 'Размер окна включен'
              : 'Размер окна отключен'}
          </Typography>

          {block.isWindowSizeEnabled && (
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Ширина (мм)"
                type="number"
                value={widthInMM}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                fullWidth
              />
              <TextField
                label="Высота (мм)"
                type="number"
                value={heightInMM}
                onChange={(e) =>
                  handleDimensionChange('height', e.target.value)
                }
                fullWidth
              />
            </Box>
          )}

          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <FrameBlockEditDeleteButtons
              id={block.id}
              currentFrameBlock={block}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FrameBlockCard;
