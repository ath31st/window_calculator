'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const UnauthorizedPage: React.FC = () => {
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
        401
      </Typography>
      <Typography variant="h6">
        Вы не авторизованы для доступа к этой странице
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/login')}
      >
        Перейти к авторизации
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
