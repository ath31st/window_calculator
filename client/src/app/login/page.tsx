'use client';

import CommonLayout from '@/components/layouts/CommonLayout';
import LoginForm from '@/components/LoginForm';
import React from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      await login(credentials);
      router.push('/');
    } catch {
      console.error('Failed to log in');
    }
  };

  return (
    <CommonLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 3,
        }}
      >
        <Typography variant="h4">Вход</Typography>
        {error && (
          <Typography
            color="error"
            onClick={clearError}
            sx={{ cursor: 'pointer' }}
          >
            {error}
          </Typography>
        )}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}
      </Box>
    </CommonLayout>
  );
};

export default LoginPage;
