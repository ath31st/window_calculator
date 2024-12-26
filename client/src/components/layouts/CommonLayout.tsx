'use client';

import { Box } from '@mui/material';
import { useCartInitialization } from '@/hooks/use.cart.initialization';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  useCartInitialization();

  return (
    <Box
      sx={{
        maxWidth: {
          xs: '100%',
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
        },
        margin: '0 auto',
        padding: '0 5px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CommonLayout;
