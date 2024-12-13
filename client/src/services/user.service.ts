import { User, UpdateUser, NewUser, ChangePassword } from '@/types/api';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/users';

export const getUser = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getUsers = async (
  email?: string,
  ascending?: boolean,
): Promise<User[]> => {
  const response = await axios.get(API_URL, { params: { email, ascending } });
  return response.data;
};

export const updateUser = async (updateUser: UpdateUser): Promise<User> => {
  const response = await axios.put(API_URL, updateUser);
  return response.data;
};

export const createUser = async (newUser: NewUser): Promise<User> => {
  const response = await axios.post(API_URL, newUser);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const changeUserPassword = async (
  changePassword: ChangePassword,
): Promise<void> => {
  await axios.put(`${API_URL}/password`, changePassword);
};
