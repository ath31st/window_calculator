'use client';

import CommonLayout from '@/components/layouts/CommonLayout';
import CartItemList from '@/components/lists/CartItemList';
import { useCartStore } from '@/stores/cart.store';
import { Typography } from '@mui/material';

const Cart: React.FC = () => {
  const { removeFromCart } = useCartStore();
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <CommonLayout>
      <Typography variant="h5">Корзина товаров и услуг</Typography>
      <CartItemList items={cartItems} onRemove={removeFromCart} />
      <Typography variant="h6">
        Общая стоимость:{' '}
        {cartItems.reduce((acc, item) => acc + item.summary, 0)}
      </Typography>
    </CommonLayout>
  );
};

export default Cart;
