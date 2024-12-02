import { TableButton } from '@/types/api';
import { ButtonType } from '@/constants/button.type';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import TableButtonEditDeleteButtons from '../buttons/TableButtonEditDeleteButtons';

interface TableButtonListProps {
  tableButtons: TableButton[];
  buttonType: ButtonType;
  deleteTableButton: (id: number) => void;
  updateTableButton: (button: TableButton) => void;
}

const TableButtonList: React.FC<TableButtonListProps> = ({
  tableButtons,
  buttonType,
  deleteTableButton,
  updateTableButton,
}) => {
  const isModifier = buttonType === 'MODIFIER';
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleRadioChange = (id: number) => {
    setSelectedButton(id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowY: 'auto',
      }}
    >
      {isModifier ? (
        <RadioGroup
          value={selectedButton}
          onChange={(e) => handleRadioChange(Number(e.target.value))}
        >
          {tableButtons.map((button) => (
            <Box
              key={button.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <FormControlLabel
                value={button.id}
                control={<Radio />}
                label={`${button.name} (${button.value})`}
              />
              <Box>
                <TableButtonEditDeleteButtons
                  currentTableButton={button}
                  onEdit={updateTableButton}
                  onDelete={deleteTableButton}
                />
              </Box>
            </Box>
          ))}
        </RadioGroup>
      ) : (
        tableButtons.map((button) => (
          <Box
            key={button.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label={`${button.name} (${button.value})`}
            />
            <Box>
              <TableButtonEditDeleteButtons
                currentTableButton={button}
                onEdit={updateTableButton}
                onDelete={deleteTableButton}
              />
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default TableButtonList;
