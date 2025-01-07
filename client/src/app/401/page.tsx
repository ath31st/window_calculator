'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import GradientButton from '@/components/buttons/GradientButton';
import CommonLayout from '@/components/layouts/CommonLayout';
import CenteredBox from '@/components/containers/CenteredBox';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  return (
    <CommonLayout>
      <CenteredBox>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 400,
            '& input:-webkit-autofill': {
              WebkitBackgroundClip: 'text',
            },
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: '64px !important',
              color: 'primary.main',
            }}
          />
          <Typography variant="h4" color="textPrimary">
            Вы не авторизованы для доступа к этой странице
          </Typography>
          <GradientButton onClick={() => router.push('/login')}>
            <Typography variant="body2">Перейти к авторизации</Typography>
          </GradientButton>
        </Box>
      </CenteredBox>
    </CommonLayout>
  );
};

export default UnauthorizedPage;
