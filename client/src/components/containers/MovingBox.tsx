'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

interface MovingBoxProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const MovingBox: React.FC<MovingBoxProps> = ({ children, isVisible }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        transform: isMounted
          ? isVisible
            ? 'translateY(0)'
            : 'translateY(100vh)'
          : 'translateY(-100vh)',
        transition: 'transform 1.0s ease-in-out',
      }}
    >
      {children}
    </Box>
  );
};

export default MovingBox;
