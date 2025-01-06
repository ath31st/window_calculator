'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CenteredBox from '../containers/CenteredBox';

const SelectFrameNotify: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        textAlign: 'center',
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
