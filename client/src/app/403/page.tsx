'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import GradientButton from '@/components/buttons/GradientButton';
import CommonLayout from '@/components/layouts/CommonLayout';
import CenteredBox from '@/components/containers/CenteredBox';
import BlockIcon from '@mui/icons-material/Block';
import MovingBox from '@/components/containers/MovingBox';
import { useAnimatedRedirect } from '@/hooks/use.animated.redirect';

const ForbiddenPage: React.FC = () => {
  const { isVisible, handleRedirect } = useAnimatedRedirect('/');

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
            <BlockIcon
              sx={{
                fontSize: '64px !important',
                color: 'primary.main',
              }}
            />
            <Typography variant="h4">
              У вас недостаточно прав для доступа к этой странице
            </Typography>
            <GradientButton onClick={handleRedirect}>
              <Typography variant="body2">Вернуться на главную</Typography>
            </GradientButton>
          </Box>
        </CenteredBox>
      </MovingBox>
    </CommonLayout>
  );
};

export default ForbiddenPage;
