// components/CenteredBox.tsx
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import BorderedContainer from './BorderedContainer';
import BorderedBackgraundedContainer from './BorderedBackgraundedContainer';

interface CenteredBoxProps {
  children: ReactNode;
  width?: string;
  height?: string;
}

const CenteredBox: React.FC<CenteredBoxProps> = ({
  children,
  width = '500px',
  height = '350px',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <BorderedContainer>
        <BorderedBackgraundedContainer>
          <Box
            sx={{
              width: {
                xs: '300px',
                sm: '400px',
                md: '450px',
                lg: width,
                xl: width,
              },
              height: height,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              gap: 2,
            }}
          >
            {children}
          </Box>
        </BorderedBackgraundedContainer>
      </BorderedContainer>
    </Box>
  );
};

export default CenteredBox;
