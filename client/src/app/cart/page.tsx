'use client';

import CartItemCard from '@/components/cards/CartItemCard';
import CommonLayout from '@/components/layouts/CommonLayout';
import { useCartStore } from '@/stores/cart.store';
import { Box } from '@mui/material';

const Cart: React.FC = () => {
  const { removeFromCart } = useCartStore();
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <CommonLayout>
      <Box>
        {cartItems.map((item) => (
          <CartItemCard
            key={item.blockId}
            item={item}
            onRemove={removeFromCart}
          />
        ))}
      </Box>
    </CommonLayout>
  );
};

export default Cart;
