'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const ForbiddenPage: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h1" color="error">
        403
      </Typography>
      <Typography variant="h6">
        У вас недостаточно прав для доступа к этой странице
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
      >
        Вернуться на главную
      </Button>
    </Box>
  );
};

export default ForbiddenPage;
