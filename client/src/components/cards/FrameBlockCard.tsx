import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import FrameBlockName from '../texts/FrameBlockName';
import generateUniqueNumber from '@/utils/generate.unique.number';
import TableIdsHint from '../hints/TableIdsHint';
import validateFormula from '@/utils/validate.formula';
import validateTableIdsInFormula from '@/utils/validate.table.ids.in.formula';

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
  } = useBlockTables(setSelectedModifiers, setSelectedValues);

  const [formula, setFormula] = useState<string>('');
  const [fixedFormula, setFixedFormula] = useState<string>('');
  const [validationError, setValidationError] = useState<string | undefined>();

  const calculateSummary = useSummaryCalculation(
    selectedModifiers,
    selectedValues,
    multiplier,
    heightInMM,
    widthInMM,
    isEditMode ? fixedFormula : undefined,
  );

  const [summary, setSummary] = useState<number>(0);

  const { addToCart, countInCart } = useCartStore();

  const handleCartAction = () => {
    const cartItemId = generateUniqueNumber();
    addToCart({ id: cartItemId, blockId: block.id, name: block.name, summary });
  };

  useEffect(() => {
    setSummary(calculateSummary());
  }, [selectedModifiers, selectedValues, multiplier, calculateSummary]);

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        boxShadow: 0,
        border: 0,
        borderColor: theme.palette.secondary.main,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <CardContent
        sx={{
          '&:last-child': {
            paddingBottom: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FrameBlockName name={block.name} />

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

          {isEditMode && (
            <Box>
              <TableIdsHint
                blockTables={blockTablesFull
                  .filter((bt) => bt.frameBlockId === block.id)
                  .map((bt) => ({
                    id: bt.id,
                    name: bt.name,
                    type: bt.buttonType,
                  }))}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  label="Формула"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                  fullWidth
                  placeholder="Пример: (1+2)*4+5"
                  error={!!validationError}
                  helperText={validationError}
                />
                <IconButton
                  onClick={() => {
                    const formulaValidationResult = validateFormula(formula);
                    if (!formulaValidationResult.isValid) {
                      setValidationError(formulaValidationResult.error);
                      return;
                    }

                    const availableTableIds = blockTablesFull
                      .filter((bt) => bt.frameBlockId === block.id)
                      .map((bt) => bt.id);

                    const tableIdsValidationResult = validateTableIdsInFormula(
                      formula,
                      availableTableIds,
                    );

                    if (!tableIdsValidationResult.isValid) {
                      setValidationError(tableIdsValidationResult.error);
                      return;
                    }

                    setFixedFormula(formula);
                    setValidationError(undefined);
                  }}
                  color="primary"
                  disabled={formula === fixedFormula}
                >
                  <CheckIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              background: `linear-gradient(270deg,${theme.palette.secondary.main}, transparent 90%)`,
              padding: '4px 12px',
              borderRadius: theme.shape.borderRadius,
            }}
          >
            <Typography variant="body1">{`Стоимость: ${summary} ₽`}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {countInCart(block.id) > 0 && (
                <Typography variant="body1">
                  {`В корзине: ${countInCart(block.id)}`}
                </Typography>
              )}
              <IconButton
                color="primary"
                onClick={handleCartAction}
                disabled={summary === 0}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Box>
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
