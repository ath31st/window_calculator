import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { useFrameBlockStore } from '@/stores/frame.block.store';
import { FrameBlockFull } from '@/types/api';

interface FrameBlockCardProps {
  block: FrameBlockFull;
  onEdit: (block: FrameBlockFull) => void;
  onDelete: (id: number) => void;
}

const FrameBlockCard: React.FC<FrameBlockCardProps> = ({ block, onEdit, onDelete }) => {
  const { loading } = useFrameBlockStore((state) => state);

  return (
    <Card sx={{ width: '100%', mb: 2 }}>
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              onClick={() => onEdit(block)}
              disabled={loading}
              sx={{ mr: 1 }}
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(block.id)}
              disabled={loading}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FrameBlockCard;
