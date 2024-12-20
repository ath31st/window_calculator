'use client';

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { JwtUser } from '@/types/models';
import { ChangePassword } from '@/types/api';
import ChangePasswordDialog from './ChangePasswordDialog';

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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Изменение пароля</DialogTitle>
      <DialogContent
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 300,
        }}
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
            <DialogActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
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

              <ChangePasswordDialog
                userId={user.userId}
                isOpen={isOpenChangePassword}
                onClose={() => setIsOpenChangePassword(false)}
                onChangePassword={onChangePassword}
              />
            </DialogActions>
          </>
        ) : (
          <Typography>Данные пользователя недоступны</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
