'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CenteredBox from '../containers/CenteredBox';
import { useEffect, useState } from 'react';

const SelectFrameNotify: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
      localStorage.setItem('selectFrameAnimationShown', 'true');
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        textAlign: 'center',
        transform: isMounted ? 'translateY(0)' : 'translateY(-100vh)',
        transition: 'transform 1.0s ease-in-out',
      }}
    >
      <CenteredBox>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Выберите фрейм
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100px',
            height: '100px',
          }}
        >
          <Image
            src="/images/arrow_double_down.png"
            alt="Select a frame"
            fill
            style={{ objectFit: 'contain' }}
            priority
            sizes="(max-width: 600px) 100vw, 50vw"
          />
        </Box>
      </CenteredBox>
    </Box>
  );
};

export default SelectFrameNotify;
