import theme from '@/app/_theme/theme';
import { alpha, Box } from '@mui/material';

interface BorderedContainerProps {
  children: React.ReactNode;
}

const BorderedContainer: React.FC<BorderedContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        borderRadius: theme.shape.borderRadius,
        margin: {
          xs: '5px',
          sm: '7px',
          md: '10px',
          lg: '10px',
          xl: '15px',
        },
        padding: {
          xs: '8px',
          sm: '10px',
          md: '12px',
          lg: '16px',
          xl: '20px',
        },
        border: `1px solid ${theme.palette.background.paper}`,
        backgroundColor: alpha(theme.palette.background.default, 0.1),
        boxShadow: theme.shadows[3],
      }}
    >
      {children}
    </Box>
  );
};

export default BorderedContainer;
