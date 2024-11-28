import { BlockTable, NewBlockTable } from '@/types/api';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/block_tables';

export const addBlockTable = async (
  newBlockTable: NewBlockTable,
): Promise<BlockTable> => {
  const response = await axios.post<BlockTable>(API_URL, newBlockTable);
  return response.data;
};

export const updateBlockTable = async (
  updateBlockTable: BlockTable,
): Promise<BlockTable> => {
  const response = await axios.put<BlockTable>(API_URL, updateBlockTable);
  return response.data;
};

export const deleteBlockTable = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
