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
import { generateCartPdf } from '@/utils/generate.cart.pdf';
import BorderedContainer from '@/components/containers/BorderedContainer';
import theme from '../_theme/theme';

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
        <BorderedContainer>
          <PageHeader title="Корзина товаров и услуг" />
          {isCartEmpty ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: { xs: '30vh', md: '50vh' },
              }}
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: { xs: 60, md: 120, lg: 150 },
                  color: theme.palette.text.primary,
                }}
              />
              <Typography
                variant="h5"
                sx={{ color: theme.palette.text.primary }}
              >
                Ваша корзина пуста
              </Typography>
            </Box>
          ) : (
            <>
              <CartItemList items={cartItems} onRemove={removeFromCart} />
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="h6" sx={{}}>
                  Общая стоимость:{' '}
                  {cartItems.reduce((acc, item) => acc + item.summary, 0)} ₽
                </Typography>
                <Button
                  color="secondary"
                  onClick={() => generateCartPdf(cartItems)}
                >
                  Скачать PDF
                </Button>
                <Button color="secondary" onClick={() => setDialogOpen(true)}>
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
        </BorderedContainer>
      </CommonLayout>
    </RoleGuard>
  );
};

export default Cart;
