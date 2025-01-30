'use client';

import CommonLayout from '@/components/layouts/CommonLayout';
import LoginForm from '@/components/LoginForm';
import React, { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import LoginIcon from '@mui/icons-material/Login';
import CenteredBox from '@/components/containers/CenteredBox';
import MovingBox from '@/components/containers/MovingBox';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuthStore();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      await login(credentials);
      setIsVisible(false);
      setTimeout(() => router.push('/'), 1000);
    } catch {
      console.error('Failed to log in');
    }
  };

  return (
    <CommonLayout>
      <MovingBox isVisible={isVisible}>
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
      </MovingBox>
    </CommonLayout>
  );
};

export default LoginPage;
