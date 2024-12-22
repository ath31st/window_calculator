import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '@/constants/auth';
import { useAuthStore } from '@/stores/auth.store';
import { isTokenExpired } from '@/services/jwt.service';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRrefreshed = (newAccessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

const setupAxiosInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const { accessToken } = JSON.parse(storedData);
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const { status, config } = error.response;

      if (status === 403) {
        window.location.href = '/403';
      }

      if (status === 401 && config.url?.endsWith('/logout')) {
        console.warn('401 error ignored for /logout request');
        return Promise.resolve();
      }

      if (status === 401 && !originalRequest._retry) {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken || isTokenExpired(refreshToken)) {
          await useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken) => {
              if (newToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                resolve(axios(originalRequest));
              } else {
                reject(error);
              }
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await useAuthStore.getState().refreshAccessToken();
          const newAccessToken = useAuthStore.getState().accessToken;

          if (newAccessToken) {
            onRrefreshed(newAccessToken);
            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } else {
            throw new Error('New access token is null');
          }
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          await useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};

export default setupAxiosInterceptor;
