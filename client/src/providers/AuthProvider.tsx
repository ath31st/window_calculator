'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (useAuthStore.getState().isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
