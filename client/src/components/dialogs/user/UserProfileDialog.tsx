'use client';

import React from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { JwtUser } from '@/types/models';

interface UserProfileDialogProps {
  user: JwtUser | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 300,
        }}
      >
        <Typography variant="h6" textAlign="center">
          Профиль пользователя
        </Typography>
        {user ? (
          <>
            <Typography>
              <strong>Имя:</strong> {user.name || 'Не указано'}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email || 'Не указано'}
            </Typography>
            <Typography>
              <strong>Роль:</strong> {user.role}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Выйти
            </Button>
          </>
        ) : (
          <Typography>Данные пользователя недоступны</Typography>
        )}
      </Box>
    </Dialog>
  );
};

export default UserProfileDialog;
