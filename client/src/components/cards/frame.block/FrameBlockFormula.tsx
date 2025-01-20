import { Box, TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { BlockTableFull, FrameBlockFull } from '@/types/api';
import validateFormula from '@/utils/validate.formula';
import validateTableIdsInFormula from '@/utils/validate.table.ids.in.formula';
import TableIdsHint from '@/components/hints/TableIdsHint';

interface FrameBlockFormulaProps {
  isEditMode: boolean;
  formula: string;
  setFormula: (formula: string) => void;
  fixedFormula: string;
  setFixedFormula: (formula: string) => void;
  validationError?: string;
  setValidationError: (error: string | undefined) => void;
  blockTablesFull: BlockTableFull[];
  block: FrameBlockFull;
}

const FrameBlockFormula: React.FC<FrameBlockFormulaProps> = ({
  isEditMode,
  formula,
  setFormula,
  fixedFormula,
  setFixedFormula,
  validationError,
  setValidationError,
  blockTablesFull,
  block,
}) => {
  if (!isEditMode) return null;

  return (
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
          placeholder="Пример: ((1+2)*4)*m+5"
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
  );
};

export default FrameBlockFormula;
