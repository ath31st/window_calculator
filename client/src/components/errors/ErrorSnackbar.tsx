'use client';

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useGlobalErrorStore } from '@/stores/global.error.store';

const ErrorSnackbar: React.FC = () => {
  const { error, setError } = useGlobalErrorStore();

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={() => setError(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setError(null)}
        severity="error"
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
