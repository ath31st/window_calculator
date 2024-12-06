'use client';

import { Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: React.FC = () => {
  const handleUserClick = () => {
    console.log('User icon clicked');
  };

  const handleCartClick = () => {
    console.log('Cart icon clicked');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 1100,
      }}
    >
      <IconButton
        onClick={handleUserClick}
        sx={{ bgcolor: 'background.paper', boxShadow: 2 }}
      >
        <AccountCircleIcon />
      </IconButton>
      <IconButton
        onClick={handleCartClick}
        sx={{ bgcolor: 'background.paper', boxShadow: 2 }}
      >
        <ShoppingCartIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
