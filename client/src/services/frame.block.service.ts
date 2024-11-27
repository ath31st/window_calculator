import { FrameBlock, NewFrameBlock } from '@/types/api';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/frame_blocks';

export const addFrameBlock = async (
  newFrameBLock: NewFrameBlock,
): Promise<FrameBlock> => {
  const response = await axios.post<FrameBlock>(API_URL, newFrameBLock);
  return response.data;
};

export const updateFrameBlock = async (
  updateFrameBlock: FrameBlock,
): Promise<FrameBlock> => {
  const response = await axios.put<FrameBlock>(API_URL, updateFrameBlock);
  return response.data;
};

export const deleteFrameBlock = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
