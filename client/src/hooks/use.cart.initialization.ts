import { useEffect } from 'react';
import { useCartStore } from '@/stores/cart.store';

export const useCartInitialization = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        useCartStore.getState().setCartItems(cartItems);
      }
    }
  }, []);
};
