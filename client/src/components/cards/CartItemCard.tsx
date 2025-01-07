'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '@/types/models';
import DeleteCartItemDialog from '../dialogs/cart/DeleteCartItemDialog';
import OrSpacer from '../dividers/OrSpacer';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (blockId: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

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
        </Box>

        <IconButton onClick={() => setDialogOpen(true)}>
          <DeleteIcon />
        </IconButton>

        <DeleteCartItemDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onDelete={onRemove}
          blockTableId={item.blockId}
        />
      </CardContent>
      
      <OrSpacer />
    </Card>
  );
};

export default CartItemCard;
