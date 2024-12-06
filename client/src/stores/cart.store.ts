import { create } from 'zustand';
import { CartItem } from '@/types/models';

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (blockId: number) => void;
  clearCart: () => void;
  isInCart: (blockId: number) => boolean;
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

  removeFromCart: (blockId) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.blockId !== blockId,
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),

  clearCart: () =>
    set(() => {
      localStorage.setItem('cart', JSON.stringify([]));
      return { cartItems: [] };
    }),

  isInCart: (blockId): boolean => {
    const state = useCartStore.getState();
    return state.cartItems.some((item) => item.blockId === blockId);
  },

  setCartItems: (items) => set({ cartItems: items }),
}));
