import { Credentials, JwtResponse } from '@/types/api';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/auth';

export const login = async (credentials: Credentials): Promise<JwtResponse> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.delete(`${API_URL}/logout`);
};

const axiosWithoutInterceptors = axios.create();

export const refreshAccessToken = async (
  refreshToken: string,
  signal?: AbortSignal,
): Promise<JwtResponse> => {
  try {
    const response = await axiosWithoutInterceptors.post(
      `${API_URL}/refresh`,
      { refreshToken },
      { signal },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        throw new Error('Refresh token is invalid or expired');
      }
    }
    throw error;
  }
};
