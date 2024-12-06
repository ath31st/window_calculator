'use client';

import { Box } from '@mui/material';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
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
      }}
    >
      {children}
    </Box>
  );
};

export default CommonLayout;
