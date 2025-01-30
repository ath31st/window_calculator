'use client';

import Header from '@/components/Header';
import CommonLayout from '@/components/layouts/CommonLayout';
import CartItemList from '@/components/lists/CartItemList';
import { useCartStore } from '@/stores/cart.store';
import { Typography, Box } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from 'react';
import ClearCartItemsDialog from '@/components/dialogs/cart/ClearCartItemsDialog';
import RoleGuard from '@/components/RoleGuard';
import PageHeader from '@/components/texts/PageHeader';
import {
  generateCartPdf,
  generateCartPdfWithNotes,
} from '@/utils/generate.cart.pdf';
import BorderedContainer from '@/components/containers/BorderedContainer';
import theme from '../_theme/theme';
import CommonButton from '@/components/buttons/CommonButton';
import BorderedBackgraundedContainer from '@/components/containers/BorderedBackgraundedContainer';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Cart: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { removeFromCart, clearCart, changeNote } = useCartStore();
  const cartItems = useCartStore((state) => state.cartItems);
  const roles = ['ADMIN', 'USER'];

  const isCartEmpty = cartItems.length === 0;

  return (
    <RoleGuard roles={roles}>
      <CommonLayout>
        <Header />
        <BorderedContainer>
          <BorderedBackgraundedContainer>
            <PageHeader title="Корзина товаров и услуг" />
            {isCartEmpty ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: { xs: '30vh', md: '40vh' },
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{
                    fontSize: { xs: 60, md: 100, lg: 130 },
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
                <CartItemList
                  items={cartItems}
                  onRemove={removeFromCart}
                  onNoteChange={changeNote}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginX: 3,
                    paddingY: 2,
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 1, md: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      flexShrink: 0,
                    }}
                  >
                    Общая стоимость:{' '}
                    {cartItems.reduce((acc, item) => acc + item.summary, 0)} ₽
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row' }}>
                    <CommonButton
                      color="secondary"
                      startIcon={<PictureAsPdfIcon />}
                      onClick={() => generateCartPdf(cartItems)}
                    >
                      Сохранить
                    </CommonButton>

                    <CommonButton
                      color="secondary"
                      startIcon={<PictureAsPdfIcon />}
                      onClick={() => generateCartPdfWithNotes(cartItems)}
                    >
                      Сохранить с примечаниями
                    </CommonButton>
                  </Box>

                  <CommonButton
                    color="secondary"
                    onClick={() => setDialogOpen(true)}
                  >
                    Очистить корзину
                  </CommonButton>
                </Box>

                <ClearCartItemsDialog
                  isOpen={isDialogOpen}
                  onClose={() => setDialogOpen(false)}
                  onClear={clearCart}
                />
              </>
            )}
          </BorderedBackgraundedContainer>
        </BorderedContainer>
      </CommonLayout>
    </RoleGuard>
  );
};

export default Cart;
