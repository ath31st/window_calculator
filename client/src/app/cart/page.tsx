'use client';

import Header from '@/components/Header';
import CommonLayout from '@/components/layouts/CommonLayout';
import CartItemList from '@/components/lists/CartItemList';
import { useCartStore } from '@/stores/cart.store';
import { Typography, Box, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from 'react';
import ClearCartItemsDialog from '@/components/dialogs/cart/ClearCartItemsDialog';
import RoleGuard from '@/components/RoleGuard';
import PageHeader from '@/components/headers/PageHeader';

const Cart: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { removeFromCart, clearCart } = useCartStore();
  const cartItems = useCartStore((state) => state.cartItems);
  const roles = ['ADMIN', 'USER'];

  const isCartEmpty = cartItems.length === 0;

  return (
    <RoleGuard roles={roles}>
      <CommonLayout>
        <Header />
        <PageHeader title="Корзина товаров и услуг" />
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setDialogOpen(true)}
              >
                Очистить корзину
              </Button>
            </Box>

            <ClearCartItemsDialog
              isOpen={isDialogOpen}
              onClose={() => setDialogOpen(false)}
              onClear={clearCart}
            />
          </>
        )}
      </CommonLayout>
    </RoleGuard>
  );
};

export default Cart;
