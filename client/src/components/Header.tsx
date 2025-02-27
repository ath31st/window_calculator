'use client';

import { Box, Badge } from '@mui/material';
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
import RoundButton from './buttons/RoundButton';

const Header: React.FC = () => {
  const { logout } = useAuthStore();
  const { changeUserPassword, user } = useUserStore();
  const { isEditMode, toggleEditMode } = useEditModeStore();
  const { cartItems } = useCartStore();
  const pathname = usePathname();
  const isAdmin = user?.role === 1;

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
          top: { xs: 22, md: 60 },
          right: { xs: 6, md: 20 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, md: 2 },
          zIndex: 1100,
        }}
      >
        <RoundButton onClick={handleUserClick} icon={<AccountCircleIcon />} />

        {routes
          .filter(({ isAdminOnly }) => !isAdminOnly || isAdmin)
          .map(({ path, icon, showOn, isEditModeButton }) => {
            if (!showOn.includes(pathname)) return null;

            return isEditModeButton ? (
              <RoundButton
                key={path}
                onClick={toggleEditMode}
                icon={icon}
                isActive={isEditMode}
                isEditModeButton
              />
            ) : (
              <Link key={path} href={path} passHref>
                <RoundButton icon={icon} />
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
