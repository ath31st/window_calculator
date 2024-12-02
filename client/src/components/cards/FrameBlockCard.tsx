import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
} from '@mui/material';
import { FrameBlock, FrameBlockFull } from '@/types/api';
import { FrameBlockEditDeleteButtons } from '../buttons/FrameBlockEditDeleteButtons';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddBlockTableDialog from '../dialogs/block.table/AddBlockTableDialog';
import BlockTableList from '../lists/BlockTableList';
import useBlockTableStore from '@/stores/block.table.store';

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
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [widthInMM, setWidthInMM] = useState<number>(0);
  const [heightInMM, setHeightInMM] = useState<number>(0);
  const { blockTablesFull, addBlockTable, updateBlockTable, deleteBlockTable } =
    useBlockTableStore();

  const handleDimensionChange = (
    key: 'width' | 'height' | 'multiplier',
    value: string,
  ) => {
    const numericValue = parseInt(value, 10) || 0;
    if (key === 'width') {
      setWidthInMM(numericValue);
    } else if (key === 'height') {
      setHeightInMM(numericValue);
    } else if (key === 'multiplier') {
      setMultiplier(numericValue);
    }
  };

  return (
    <Card sx={{ width: '100%', mb: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {block.name}
          </Typography>

          <BlockTableList
            blockTablesFull={blockTablesFull.filter(
              (bt) => bt.frameBlockId === block.id,
            )}
            deleteBlockTable={(id) => deleteBlockTable(id)}
            updateBlockTable={(table) => updateBlockTable(table)}
          />

          <Box>
            <IconButton onClick={() => setDialogOpen(true)}>
              <AddIcon />
            </IconButton>
          </Box>

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

          <TextField
            label={block.inputTitle}
            type="number"
            value={multiplier}
            onChange={(e) =>
              handleDimensionChange('multiplier', e.target.value)
            }
            fullWidth
          />

          <AddBlockTableDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={(newBlockTable) => {
              addBlockTable(newBlockTable);
            }}
            frameBlockId={block.id}
          />

          <Typography variant="body2" sx={{ mb: 2 }}>
            {block.description}
          </Typography>

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
