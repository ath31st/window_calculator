'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '@/types/models';
import DeleteCartItemDialog from '../dialogs/cart/DeleteCartItemDialog';
import theme from '@/app/_theme/theme';

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
        boxShadow: 4,
        borderRadius: theme.shape.borderRadius,
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

        <IconButton color="error" onClick={() => setDialogOpen(true)}>
          <DeleteIcon />
        </IconButton>

        <DeleteCartItemDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onDelete={onRemove}
          blockTableId={item.blockId}
        />
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
