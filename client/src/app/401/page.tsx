'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import GradientButton from '@/components/buttons/GradientButton';
import CommonLayout from '@/components/layouts/CommonLayout';
import CenteredBox from '@/components/containers/CenteredBox';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MovingBox from '@/components/containers/MovingBox';
import { useAnimatedRedirect } from '@/hooks/use.animated.redirect';

const UnauthorizedPage: React.FC = () => {
  const { isVisible, handleRedirect } = useAnimatedRedirect('/login');

  return (
    <CommonLayout>
      <MovingBox isVisible={isVisible}>
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
            <GradientButton onClick={handleRedirect}>
              <Typography variant="body2">Перейти к авторизации</Typography>
            </GradientButton>
          </Box>
        </CenteredBox>
      </MovingBox>
    </CommonLayout>
  );
};

export default UnauthorizedPage;
