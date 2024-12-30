import theme from '@/app/_theme/theme';
import { Box } from '@mui/material';

interface BorderedBackgraundedContainerProps {
  children: React.ReactNode;
}

const BorderedBackgraundedContainer: React.FC<
  BorderedBackgraundedContainerProps
> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {children}
    </Box>
  );
};

export default BorderedBackgraundedContainer;
