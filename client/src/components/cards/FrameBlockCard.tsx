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
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddBlockTableDialog from '../dialogs/block.table/AddBlockTableDialog';
import BlockTableList from '../lists/BlockTableList';
import { useSummaryCalculation } from '@/hooks/use.summary.calculation';
import { useDimensions } from '@/hooks/use.dimensions';
import { useBlockTables } from '@/hooks/use.block.tables';

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
  const { widthInMM, heightInMM, multiplier, handleDimensionChange } =
    useDimensions();

  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<number, number>
  >({});
  const [selectedValues, setSelectedValues] = useState<
    Record<number, number[]>
  >({});

  const {
    blockTablesFull,
    addBlockTable,
    updateBlockTable,
    deleteBlockTable,
    handleTableButtonChange,
  } = useBlockTables(
    selectedModifiers,
    setSelectedModifiers,
    selectedValues,
    setSelectedValues,
  );

  const calculateSummary = useSummaryCalculation(
    selectedModifiers,
    selectedValues,
    multiplier,
  );
  const [summary, setSummary] = useState<number>(0);

  useEffect(() => {
    setSummary(calculateSummary());
  }, [selectedModifiers, selectedValues, multiplier, calculateSummary]);

  return (
    <Card sx={{ width: '100%', position: 'relative' }}>
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
            onChange={(buttonType, id, value) =>
              handleTableButtonChange(buttonType, id, value)
            }
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

          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {block.description}
          </Typography>

          <Typography variant="body2">
            {`Стоимость: ${summary}`}
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
