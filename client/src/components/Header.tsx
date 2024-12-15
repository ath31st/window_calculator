'use client';

import { Box, IconButton, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { useCartStore } from '@/stores/cart.store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { useState } from 'react';
import UserProfileDialog from './dialogs/user/UserProfileDialog';

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const pathname = usePathname();

  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleUserClick = () => {
    setProfileOpen(true);
  };

  const routes = [
    {
      path: '/',
      icon: <HomeIcon />,
      showOn: ['/cart', '/profile', '/users'],
    },
    {
      path: '/cart',
      icon: (
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      ),
      showOn: ['/'],
    },
    {
      path: '/users',
      icon: <GroupIcon />,
      showOn: ['/'],
    },
  ];

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 8,
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

        {routes.map(
          ({ path, icon, showOn }) =>
            showOn.includes(pathname) && (
              <Link key={path} href={path} passHref>
                <IconButton sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
                  {icon}
                </IconButton>
              </Link>
            ),
        )}
      </Box>
      
      <UserProfileDialog
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setProfileOpen(false)}
        onLogout={logout}
      />
    </>
  );
};

export default Header;
