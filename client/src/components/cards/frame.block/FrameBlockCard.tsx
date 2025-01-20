import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { FrameBlock, FrameBlockFull } from '@/types/api';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddBlockTableDialog from '../../dialogs/block.table/AddBlockTableDialog';
import BlockTableList from '../../lists/BlockTableList';
import { useSummaryCalculation } from '@/hooks/use.summary.calculation';
import { useDimensions } from '@/hooks/use.dimensions';
import { useBlockTables } from '@/hooks/use.block.tables';
import theme from '@/app/_theme/theme';
import FrameBlockName from '../../texts/FrameBlockName';
import FrameBlockFormula from './FrameBlockFormula';
import FrameBlockDimensions from './FrameBlockDimensions';
import FrameBlockSummary from './FrameBlockSummary';
import FrameBlockActions from './FrameBlockActions';

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

          <FrameBlockDimensions
            isWindowSizeEnabled={block.isWindowSizeEnabled}
            inputTitle={block.inputTitle}
            widthInMM={widthInMM}
            heightInMM={heightInMM}
            multiplier={multiplier}
            onWidthChange={(value) => handleDimensionChange('width', value)}
            onHeightChange={(value) => handleDimensionChange('height', value)}
            onMultiplierChange={(value) =>
              handleDimensionChange('multiplier', value)
            }
          />

          <AddBlockTableDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAdd={(newBlockTable) => {
              addBlockTable(newBlockTable);
            }}
            frameBlockId={block.id}
          />

          <Typography variant="subtitle2">{block.description}</Typography>

          <FrameBlockFormula
            isEditMode={isEditMode}
            formula={formula}
            setFormula={setFormula}
            fixedFormula={fixedFormula}
            setFixedFormula={setFixedFormula}
            validationError={validationError}
            setValidationError={setValidationError}
            blockTablesFull={blockTablesFull}
            block={block}
          />

          <FrameBlockSummary summary={summary} blockId={block.id} />

          <FrameBlockActions
            isEditMode={isEditMode}
            block={block}
            onEdit={onEdit}
            onDelete={onDelete}
            setDialogOpen={setDialogOpen}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default FrameBlockCard;
