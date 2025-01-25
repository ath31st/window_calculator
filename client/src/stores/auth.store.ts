import { LOCAL_STORAGE_KEY } from '@/constants/auth';
import { login, logout, refreshAccessToken } from '@/services/auth.service';
import { decodeToken, isTokenExpired } from '@/services/jwt.service';
import { Credentials } from '@/types/api';
import { JwtUser } from '@/types/models';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { useCartStore } from './cart.store';
import { useGlobalErrorStore } from './global.error.store';
import { useUserStore } from './user.store';

interface AuthState {
  user: JwtUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  hydrate: () => void;
  handleError: (error: unknown) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  hydrate: async () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!storedData) {
      set({ isLoading: false });
      return;
    }

    const { accessToken, refreshToken, user } = JSON.parse(storedData);
    if (accessToken && !isTokenExpired(accessToken)) {
      set({
        accessToken,
        refreshToken,
        user,
        isAuthenticated: true,
      });

      // if (user?.userId && accessToken) {
      //   useUserStore.getState().fetchUser(user.userId);
      // }
    } else if (refreshToken && !isTokenExpired(refreshToken)) {
      set({ refreshToken });
      await get().refreshAccessToken();
    } else {
      console.log('Invalid access token or refresh token');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    set({ isLoading: false });
  },

  handleError: (error: unknown) => {
    console.log(error);
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = `Error code: ${statusCode}. ${error.response?.data?.error}`;
      useGlobalErrorStore.getState().setError(message);
    } else {
      useGlobalErrorStore.getState().setError('Unknown error');
    }
  },

  login: async (credentials: Credentials) => {
    try {
      const { accessToken, refreshToken } = await login(credentials);
      const user = decodeToken(accessToken);

      set({
        accessToken,
        refreshToken,
        user,
        isAuthenticated: true,
      });

      if (user?.userId) {
        useUserStore.getState().fetchUser(user.userId);
      }

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken, refreshToken, user }),
      );
    } catch (error) {
      get().handleError(error);
      console.log('Login error:', error);
    }
  },

  logout: async () => {
    const { refreshToken } = get();
    if (!refreshToken) return;

    try {
      await logout();
    } catch (error) {
      get().handleError(error);
    } finally {
      set({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
      });

      useUserStore.getState().setUser(null);
      useCartStore.getState().clearCart();

      localStorage.removeItem(LOCAL_STORAGE_KEY);

      window.location.href = '/401';
    }
  },

  refreshAccessToken: async () => {
    const { refreshToken } = get();
    try {
      const resonse = await refreshAccessToken(refreshToken!);
      const newAccessToken = resonse.accessToken;

      const user = decodeToken(newAccessToken);

      set({
        accessToken: newAccessToken,
        isAuthenticated: true,
        user,
      });

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken: newAccessToken, refreshToken, user }),
      );
    } catch (error: AxiosError | unknown) {
      get().handleError(error);
      await get().logout();
    }
  },
}));
