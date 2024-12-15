'use client';

import React, { useEffect } from 'react';
import setupAxiosInterceptor from '@/interceptors/axios.intertceptor';

interface AxiosInterceptorProviderProps {
  children: React.ReactNode;
}

const AxiosInterceptorProvider: React.FC<AxiosInterceptorProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    setupAxiosInterceptor();
  }, []);
  
  return <>{children}</>;
};

export default AxiosInterceptorProvider;
