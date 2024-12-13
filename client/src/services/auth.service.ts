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

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<JwtResponse> => {
  const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
  return response.data;
};
