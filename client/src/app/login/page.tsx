'use client';

import CommonLayout from '@/components/layouts/CommonLayout';
import LoginForm from '@/components/LoginForm';
import React from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import BorderedContainer from '@/components/containers/BorderedContainer';
import BorderedBackgraundedContainer from '@/components/containers/BorderedBackgraundedContainer';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuthStore();
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
          minHeight: '60vh',
        }}
      >
        <BorderedContainer>
          <BorderedBackgraundedContainer>
            <Box
              sx={{
                width: {
                  xs: '300px',
                  sm: '400px',
                  md: '450px',
                  lg: '500px',
                  xl: '600px',
                },
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h1" align="center" gutterBottom>
                Вход
              </Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <LoginForm onSubmit={handleLogin} />
              )}
            </Box>
          </BorderedBackgraundedContainer>
        </BorderedContainer>
      </Box>
    </CommonLayout>
  );
};

export default LoginPage;
