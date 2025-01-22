import { Box, Typography } from '@mui/material';
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
        borderRadius: '30%',
        width: { xs: 20, sm: 24, md: 30 },
        height: { xs: 16, sm: 20, md: 24 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          lineHeight: 1,
        }}
      >
        {id}
      </Typography>
    </Box>
  );
};

export default TableIdIcon;
