'use client';

import { Box, IconButton, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@/stores/cart.store';

const Header: React.FC = () => {
  const { cartItems } = useCartStore();

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
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Header;
