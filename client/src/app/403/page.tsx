'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import GradientButton from '@/components/buttons/GradientButton';
import CommonLayout from '@/components/layouts/CommonLayout';
import CenteredBox from '@/components/containers/CenteredBox';
import BlockIcon from '@mui/icons-material/Block';

const ForbiddenPage: React.FC = () => {
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
          <BlockIcon
            sx={{
              fontSize: '64px',
              color: 'primary.main',
            }}
          />
          <Typography variant="h4">
            У вас недостаточно прав для доступа к этой странице
          </Typography>
          <GradientButton onClick={() => router.replace('/')}>
            <Typography variant="body2">Вернуться на главную</Typography>
          </GradientButton>
        </Box>
      </CenteredBox>
    </CommonLayout>
  );
};

export default ForbiddenPage;
