import { Box, TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { BlockTableFull } from '@/types/api';
import validateFormula from '@/utils/validate.formula';
import validateTableIdsInFormula from '@/utils/validate.table.ids.in.formula';
import TableIdsHint from '@/components/hints/TableIdsHint';
import theme from '@/app/_theme/theme';
import { useEffect, useState } from 'react';

interface FrameBlockFormulaProps {
  isEditMode: boolean;
  formula: string;
  onFormulaChange: (newFormula: string) => void;
  blockId: number;
  blockTablesFull: BlockTableFull[];
}

const FrameBlockFormula: React.FC<FrameBlockFormulaProps> = ({
  isEditMode,
  formula,
  onFormulaChange,
  blockId,
  blockTablesFull,
}) => {
  const [localFormula, setLocalFormula] = useState(formula);
  const [validationError, setValidationError] = useState<string | undefined>();

  useEffect(() => {
    setLocalFormula(formula);
  }, [formula]);

  if (!isEditMode) return null;

  const handleFormulaChange = async () => {
    const formulaValidationResult = validateFormula(localFormula);
    if (!formulaValidationResult.isValid) {
      setValidationError(formulaValidationResult.error);
      return;
    }

    const availableTableIds = blockTablesFull
      .filter((bt) => bt.frameBlockId === blockId)
      .map((bt) => bt.id);

    const tableIdsValidationResult = validateTableIdsInFormula(
      localFormula,
      availableTableIds,
    );

    if (!tableIdsValidationResult.isValid) {
      setValidationError(tableIdsValidationResult.error);
      return;
    }

    try {
      onFormulaChange(localFormula);
      setValidationError(undefined);
    } catch (error) {
      setValidationError('Failed to update formula: ' + error);
    }
  };

  return (
    <Box>
      <TableIdsHint
        blockTables={blockTablesFull
          .filter((bt) => bt.frameBlockId === blockId)
          .map((bt) => ({
            id: bt.id,
            name: bt.name,
            type: bt.buttonType,
          }))}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          label="Формула"
          value={localFormula}
          onChange={(e) => setLocalFormula(e.target.value)}
          fullWidth
          placeholder="Пример: ((1+2)*4)*m+5"
          error={!!validationError}
          helperText={validationError}
          slotProps={{
            input: {
              sx: {
                borderRadius: theme.shape.borderRadius,
              },
            },
          }}
        />
        <IconButton
          onClick={handleFormulaChange}
          color="primary"
          disabled={localFormula === formula}
        >
          <CheckIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FrameBlockFormula;
