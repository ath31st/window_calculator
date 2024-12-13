import { LOCAL_STORAGE_KEY } from '@/constants/auth';
import { login, logout, refreshAccessToken } from '@/services/auth.service';
import { decodeToken, isTokenExpired } from '@/services/jwt.service';
import { Credentials } from '@/types/api';
import { JwtUser } from '@/types/models';
import { AxiosError } from 'axios';
import { create } from 'zustand';

interface AuthState {
  user: JwtUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  hydrate: () => void;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  hydrate: async () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const { accessToken, refreshToken, user } = JSON.parse(storedData);
      if (accessToken && !isTokenExpired(accessToken)) {
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
          error: null,
        });
      } else {
        if (refreshToken && !isTokenExpired(refreshToken)) {
          set({ refreshToken });
          await get().refreshAccessToken();
        } else {
          console.log('Invalid access token or refresh token');
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    }
    set({ isLoading: false });
  },

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = `${error.response?.data?.message} ${statusCode}`;
      set({ error: message });
    } else {
      set({ error: 'Unknown error' });
    }
  },

  clearError: () => {
    set({ error: null });
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
        error: null,
      });

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken, refreshToken, user }),
      );
    } catch (error) {
      console.error('Login error:', error);
      get().handleError(error);
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
        error: null,
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
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
        error: null,
      });

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken: newAccessToken, refreshToken, user }),
      );
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError && error.status === 401) {
        await get().logout();
      } else {
        console.error('Unexpected error during token refresh:', error);
        get().handleError(error);
      }
    }
  },
}));
