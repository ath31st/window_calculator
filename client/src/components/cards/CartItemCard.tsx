'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { CartItem } from '@/types/models';
import DeleteCartItemDialog from '../dialogs/cart/DeleteCartItemDialog';
import OrSpacer from '../dividers/OrSpacer';
import theme from '@/app/_theme/theme';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (cartItemId: number) => void;
  onNoteChange: (cartItemId: number, note: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onRemove,
  onNoteChange,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [note, setNote] = useState(item.note || '');
  const [isEditingNote, setIsEditingNote] = useState(false);

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    onNoteChange(item.id, note);
    setIsEditingNote(false);
  };

  const handleEditNote = () => {
    setIsEditingNote(true);
  };

  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: 0,
        border: 0,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">{`Стоимость: ${item.summary} ₽`}</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              maxWidth: '100%',
            }}
          >
            {isEditingNote ? (
              <>
                <IconButton onClick={handleSaveNote}>
                  <CheckIcon />
                </IconButton>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Введите примечание"
                  value={note}
                  onChange={handleNoteChange}
                  multiline
                  sx={{
                    width: { xs: 220, sm: 380, md: 540, lg: 750, xl: 900 },
                  }}
                  fullWidth
                />
              </>
            ) : (
              <>
                <IconButton onClick={handleEditNote}>
                  <EditIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.secondary.main,
                    maxWidth: { xs: 220, sm: 380, md: 540, lg: 750, xl: 900 },
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                  }}
                >
                  {note ? note : 'Примечание'}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        <IconButton onClick={() => setDialogOpen(true)}>
          <DeleteIcon />
        </IconButton>

        <DeleteCartItemDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onDelete={onRemove}
          blockTableId={item.id}
        />
      </CardContent>

      <OrSpacer />
    </Card>
  );
};

export default CartItemCard;
