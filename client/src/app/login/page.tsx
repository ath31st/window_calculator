'use client';

import CommonLayout from '@/components/layouts/CommonLayout';
import LoginForm from '@/components/LoginForm';
import React from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import LoginIcon from '@mui/icons-material/Login';
import CenteredBox from '@/components/containers/CenteredBox';

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
      <CenteredBox>
        <LoginIcon
          sx={{
            fontSize: '64px !important',
            color: 'primary.main',
          }}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}
      </CenteredBox>
    </CommonLayout>
  );
};

export default LoginPage;
