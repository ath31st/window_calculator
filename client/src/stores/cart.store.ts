import { create } from 'zustand';
import { CartItem } from '@/types/models';

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (blockId: number) => void;
  clearCart: () => void;
  countInCart: (blockId: number) => number;
  setCartItems: (items: CartItem[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => {
      const updatedCartItems = [...state.cartItems, item];
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),

  removeFromCart: (cartItemId) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== cartItemId,
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),

  clearCart: () =>
    set(() => {
      localStorage.setItem('cart', JSON.stringify([]));
      return { cartItems: [] };
    }),

  countInCart: (blockId): number => {
    const state = useCartStore.getState();
    return state.cartItems.filter((item) => item.blockId === blockId).length;
  },

  setCartItems: (items) => set({ cartItems: items }),
}));
