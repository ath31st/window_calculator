'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '@/types/models';
import { useCartStore } from '@/stores/cart.store';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { removeFromCart } = useCartStore();

  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">{`Стоимость: ${item.summary}`}</Typography>
        </Box>

        <IconButton color="error" onClick={() => removeFromCart(item.blockId)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
