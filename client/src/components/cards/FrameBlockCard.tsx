import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { FrameBlock, FrameBlockFull } from '@/types/api';
import { FrameBlockEditDeleteButtons } from '../buttons/FrameBlockEditDeleteButtons';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddBlockTableDialog from '../dialogs/block.table/AddBlockTableDialog';
import BlockTableList from '../lists/BlockTableList';
import { useSummaryCalculation } from '@/hooks/use.summary.calculation';
import { useDimensions } from '@/hooks/use.dimensions';
import { useBlockTables } from '@/hooks/use.block.tables';
import { useCartStore } from '@/stores/cart.store';
import theme from '@/app/_theme/theme';
import DimensionField from '../text.fields/DimensionField';

interface FrameBlockCardProps {
  block: FrameBlockFull;
  onEdit: (block: FrameBlock) => void;
  onDelete: (id: number) => void;
  isEditMode: boolean;
}

const FrameBlockCard: React.FC<FrameBlockCardProps> = ({
  block,
  onEdit,
  onDelete,
  isEditMode,
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
    heightInMM,
    widthInMM,
  );
  const [summary, setSummary] = useState<number>(0);

  const { addToCart, removeFromCart, isInCart } = useCartStore();

  const handleCartAction = () => {
    if (isInCart(block.id)) {
      removeFromCart(block.id);
    } else {
      addToCart({ blockId: block.id, name: block.name, summary });
    }
  };

  useEffect(() => {
    setSummary(calculateSummary());
  }, [selectedModifiers, selectedValues, multiplier, calculateSummary]);

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        boxShadow: 4,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6">{block.name}</Typography>

          <BlockTableList
            blockTablesFull={blockTablesFull.filter(
              (bt) => bt.frameBlockId === block.id,
            )}
            deleteBlockTable={(id) => deleteBlockTable(id)}
            updateBlockTable={(table) => updateBlockTable(table)}
            onChange={(buttonType, id, value) =>
              handleTableButtonChange(buttonType, id, value)
            }
            isEditMode={isEditMode}
          />

          {isEditMode && (
            <Box>
              <IconButton onClick={() => setDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </Box>
          )}

          {block.isWindowSizeEnabled ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DimensionField
                label="Ширина (мм)"
                value={widthInMM}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
              />
              <DimensionField
                label="Высота (мм)"
                value={heightInMM}
                onChange={(e) =>
                  handleDimensionChange('height', e.target.value)
                }
              />
            </Box>
          ) : (
            <DimensionField
              label={block.inputTitle}
              value={multiplier}
              onChange={(e) =>
                handleDimensionChange('multiplier', e.target.value)
              }
            />
          )}

          <AddBlockTableDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={(newBlockTable) => {
              addBlockTable(newBlockTable);
            }}
            frameBlockId={block.id}
          />

          <Typography variant="subtitle2">{block.description}</Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">{`Стоимость: ${summary} ₽`}</Typography>
            <IconButton
              color="primary"
              onClick={handleCartAction}
              disabled={summary === 0}
            >
              {isInCart(block.id) ? <DeleteIcon /> : <ShoppingCartIcon />}
            </IconButton>
          </Box>

          {isEditMode && (
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
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FrameBlockCard;
