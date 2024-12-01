import { NewTableButton, TableButton } from '@/types/api';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/table_buttons';

export const addTableButton = async (
  newTableButton: NewTableButton,
): Promise<TableButton> => {
  const response = await axios.post<TableButton>(API_URL, newTableButton);
  return response.data;
};

export const updateTableButton = async (
  updateTableButton: TableButton,
): Promise<TableButton> => {
  const response = await axios.put<TableButton>(API_URL, updateTableButton);
  return response.data;
};

export const deleteTableButton = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
