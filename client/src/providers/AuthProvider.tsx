'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useUserStore } from '@/stores/user.store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { hydrate, user, accessToken } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (user?.userId && accessToken) {
      useUserStore.getState().fetchUser(user.userId);
    }
  }, [user, accessToken]);

  if (useAuthStore.getState().isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
