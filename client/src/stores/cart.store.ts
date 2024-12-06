import { create } from 'zustand';

interface CartItem {
  blockId: number;
  name: string;
  summary: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (blockId: number) => void;
  clearCart: () => void;
  isInCart: (blockId: number) => boolean;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  removeFromCart: (blockId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.blockId !== blockId),
    })),

  clearCart: () => set({ cartItems: [] }),

  isInCart: (blockId): boolean => {
    const state = useCartStore.getState();
    return state.cartItems.some((item) => item.blockId === blockId);
  },
}));
