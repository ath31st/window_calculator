import { CartItem } from '@/types/models';
import { create } from 'zustand';

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (blockId: number) => void;
  clearCart: () => void;
  isInCart: (blockId: number) => boolean;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: loadCartFromLocalStorage(),

  addToCart: (item) =>
    set((state) => {
      const updatedCartItems = [...state.cartItems, item];
      saveCartToLocalStorage(updatedCartItems);
      return { cartItems: updatedCartItems };
    }),

  removeFromCart: (blockId) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.blockId !== blockId,
      );
      saveCartToLocalStorage(updatedCartItems);
      return { cartItems: updatedCartItems };
    }),

  clearCart: () =>
    set(() => {
      saveCartToLocalStorage([]);
      return { cartItems: [] };
    }),

  isInCart: (blockId): boolean => {
    const state = useCartStore.getState();
    return state.cartItems.some((item) => item.blockId === blockId);
  },
}));
