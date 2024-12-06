import { create } from 'zustand';

interface CartItem {
  name: string;
  summary: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  removeFromCart: (name) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.name !== name),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
