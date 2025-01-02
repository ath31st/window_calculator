'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import GradientButton from '@/components/buttons/GradientButton';

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
      <GradientButton onClick={() => router.replace('/')}>
        <Typography variant="body2">Вернуться на главную</Typography>
      </GradientButton>
    </Box>
  );
};

export default ForbiddenPage;
