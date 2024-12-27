'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import GradientButton from '@/components/buttons/GradientButton';

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
      <Typography variant="h4">
        Вы не авторизованы для доступа к этой странице
      </Typography>
      <GradientButton onClick={() => router.push('/login')}>
        <Typography variant="body2">Перейти к авторизации</Typography>
      </GradientButton>
    </Box>
  );
};

export default UnauthorizedPage;
