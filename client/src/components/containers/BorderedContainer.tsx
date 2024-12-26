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
          xs: '2px',
          sm: '5px',
          md: '10px',
          lg: '10px',
          xl: '10px',
        },
        padding: {
          xs: '2px',
          sm: '5px',
          md: '10px',
          lg: '15px',
          xl: '15px',
        },
        backgroundColor: alpha(theme.palette.background.paper, 0.2),
        borderColor: theme.palette.secondary.main,
        boxShadow: theme.shadows[9],
      }}
    >
      {children}
    </Box>
  );
};

export default BorderedContainer;
