'use client';

import { Box, IconButton, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import { useCartStore } from '@/stores/cart.store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { useEditModeStore } from '@/stores/edit.mode.store';
import { useState } from 'react';
import UserProfileDialog from './dialogs/user/UserProfileDialog';
import { useUserStore } from '@/stores/user.store';

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { changeUserPassword } = useUserStore();
  const { isEditMode, toggleEditMode } = useEditModeStore();
  const { cartItems } = useCartStore();
  const pathname = usePathname();
  const isAdmin = user?.role === 'ADMIN';

  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleUserClick = () => {
    setProfileOpen(true);
  };

  const routes = [
    {
      path: '/',
      icon: <HomeIcon />,
      showOn: ['/cart', '/users'],
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
      isAdminOnly: true,
    },
    {
      path: '/edit-mode',
      icon: (
        <EditIcon
          sx={{
            color: isEditMode ? 'white' : 'inherit',
          }}
        />
      ),
      showOn: ['/'],
      isAdminOnly: true,
      isEditModeButton: true,
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

        {routes
          .filter(({ isAdminOnly }) => !isAdminOnly || isAdmin)
          .map(({ path, icon, showOn, isEditModeButton }) => {
            if (!showOn.includes(pathname)) return null;

            return isEditModeButton ? (
              <IconButton
                key={path}
                onClick={toggleEditMode}
                sx={{
                  bgcolor: isEditMode ? 'primary.main' : 'background.paper',
                  boxShadow: 2,
                }}
              >
                {icon}
              </IconButton>
            ) : (
              <Link key={path} href={path} passHref>
                <IconButton sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
                  {icon}
                </IconButton>
              </Link>
            );
          })}
      </Box>

      <UserProfileDialog
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setProfileOpen(false)}
        onLogout={logout}
        onChangePassword={changeUserPassword}
      />
    </>
  );
};

export default Header;
