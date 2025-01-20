// components/TableIdIcon.tsx
import { Box } from '@mui/material';
import theme from '@/app/_theme/theme';

interface TableIdIconProps {
  id: number;
  type: 'VALUE' | 'MODIFIER';
}

const TableIdIcon: React.FC<TableIdIconProps> = ({ id, type }) => {
  return (
    <Box
      sx={{
        backgroundColor:
          type === 'VALUE'
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
        color: 'white',
        borderRadius: '50%',
        width: { xs: 16, sm: 20, md: 24 },
        height: { xs: 16, sm: 20, md: 24 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
      }}
    >
      {id}
    </Box>
  );
};

export default TableIdIcon;
