import { TableButton } from '@/types/api';
import TableButtonCard from '../cards/TableButtonCard';
import { ButtonType } from '@/constants/button.type';
import { Box } from '@mui/material';

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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        overflowY: 'auto',
      }}
    >
      {tableButtons.map((button) => (
        <TableButtonCard
          key={button.id}
          button={button}
          onDelete={deleteTableButton}
          onEdit={updateTableButton}
          buttonType={buttonType}
        />
      ))}
    </Box>
  );
};

export default TableButtonList;
