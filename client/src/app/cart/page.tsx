'use client';

import Header from '@/components/Header';
import CommonLayout from '@/components/layouts/CommonLayout';
import CartItemList from '@/components/lists/CartItemList';
import { useCartStore } from '@/stores/cart.store';
import { Typography, Box, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Cart: React.FC = () => {
  const { removeFromCart, clearCart } = useCartStore();
  const cartItems = useCartStore((state) => state.cartItems);

  const isCartEmpty = cartItems.length === 0;

  return (
    <CommonLayout>
      <Header />
      <Typography variant="h6">Корзина товаров и услуг</Typography>
      {isCartEmpty ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: 'gray' }} />
          <Typography variant="subtitle1" color="textSecondary">
            Ваша корзина пуста
          </Typography>
        </Box>
      ) : (
        <>
          <CartItemList items={cartItems} onRemove={removeFromCart} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Typography variant="h6" sx={{}}>
              Общая стоимость:{' '}
              {cartItems.reduce((acc, item) => acc + item.summary, 0)}
            </Typography>
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Очистить корзину
            </Button>
          </Box>
        </>
      )}
    </CommonLayout>
  );
};

export default Cart;
