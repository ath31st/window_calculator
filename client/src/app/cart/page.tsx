'use client';

import CartItemCard from '@/components/cards/CartItemCard';
import CommonLayout from '@/components/layouts/CommonLayout';
import { useCartStore } from '@/stores/cart.store';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const Cart: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  useEffect(() => {
    console.log('cartItems', cartItems);
  }, [cartItems]);

  return (
    <CommonLayout>
      <Box>
        {cartItems.map((item) => (
          <CartItemCard key={item.blockId} item={item} />
        ))}
      </Box>
    </CommonLayout>
  );
};

export default Cart;
