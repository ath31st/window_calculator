import { TableButton } from '@/types/api';
import { ButtonType } from '@/constants/button.type';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Typography,
} from '@mui/material';
import { useTableButtonState } from '@/hooks/use.table.button.state';
import TableButtonEditDeleteButtons from '../buttons/TableButtonEditDeleteButtons';

interface TableButtonListProps {
  tableId: number;
  tableButtons: TableButton[];
  buttonType: ButtonType;
  deleteTableButton: (id: number) => void;
  updateTableButton: (button: TableButton) => void;
  onChange: (buttonType: ButtonType, id: number, value: number) => void;
  isEditMode: boolean;
}

const TableButtonList: React.FC<TableButtonListProps> = ({
  tableId,
  tableButtons,
  buttonType,
  deleteTableButton,
  updateTableButton,
  onChange,
  isEditMode,
}) => {
  const {
    selectedButton,
    selectedCheckboxes,
    handleRadioChange,
    handleCheckboxChange,
  } = useTableButtonState({
    tableButtons,
    buttonType,
    tableId,
    onChange,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {buttonType === 'MODIFIER' ? (
        <RadioGroup
          value={selectedButton}
          onChange={(e) => handleRadioChange(Number(e.target.value))}
        >
          {tableButtons
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((button) => (
              <Box
                key={button.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <FormControlLabel
                  value={button.id}
                  control={<Radio />}
                  label={
                    <Typography variant="body2">
                      {isEditMode
                        ? `${button.name} (${button.value})`
                        : button.name}
                    </Typography>
                  }
                />
                {isEditMode && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <TableButtonEditDeleteButtons
                      currentTableButton={button}
                      onEdit={updateTableButton}
                      onDelete={deleteTableButton}
                    />
                  </Box>
                )}
              </Box>
            ))}
        </RadioGroup>
      ) : (
        tableButtons
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((button) => (
            <Box
              key={button.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id={`checkbox-${button.id}`}
                    name={`checkbox-${button.id}`}
                    checked={selectedCheckboxes.includes(button.id)}
                    onChange={() => handleCheckboxChange(button.id)}
                  />
                }
                label={
                  <Typography variant="body2">
                    {isEditMode
                      ? `${button.name} (${button.value})`
                      : button.name}
                  </Typography>
                }
              />
              {isEditMode && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TableButtonEditDeleteButtons
                    currentTableButton={button}
                    onEdit={updateTableButton}
                    onDelete={deleteTableButton}
                  />
                </Box>
              )}
            </Box>
          ))
      )}
    </Box>
  );
};

export default TableButtonList;
