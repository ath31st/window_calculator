import { Credentials } from '@/types/api';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/auth';

export const login = async (credentials: Credentials): Promise<void> => {
  await axios.post(`${API_URL}/login`, credentials);
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/logout`);
};

export const refreshToken = async (refreshToken: string): Promise<void> => {
  await axios.post(`${API_URL}/refresh`, { refreshToken });
};
