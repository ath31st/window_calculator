'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { JwtUser } from '@/types/models';
import { ChangePassword } from '@/types/api';
import ChangePasswordDialog from './ChangePasswordDialog';
import BaseDialog from '../BaseDialog';

interface UserProfileDialogProps {
  user: JwtUser | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onChangePassword: (changePassword: ChangePassword) => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
  onChangePassword,
}) => {
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  return (
    <>
      <BaseDialog
        isOpen={isOpen}
        title="Профиль пользователя"
        onClose={onClose}
        actions={
          user && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button onClick={() => setIsOpenChangePassword(true)}>
                Изменить пароль
              </Button>
              <Button
                color="error"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
              >
                Выйти
              </Button>
            </Box>
          )
        }
      >
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
          </>
        ) : (
          <Typography>Данные пользователя недоступны</Typography>
        )}
      </BaseDialog>

      <ChangePasswordDialog
        userId={user?.userId || 0}
        isOpen={isOpenChangePassword}
        onClose={() => setIsOpenChangePassword(false)}
        onChangePassword={onChangePassword}
      />
    </>
  );
};

export default UserProfileDialog;
