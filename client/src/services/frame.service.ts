import { Frame, FrameFull } from '@/types/api';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/frames';

export const getFrames = async (): Promise<Frame[]> => {
  const response = await axios.get<Frame[]>(API_URL);
  return response.data;
};

export const getFrame = async (id: number): Promise<Frame> => {
  const response = await axios.get<Frame>(`${API_URL}/${id}`);
  return response.data;
};

export const getFrameFull = async (id: number): Promise<FrameFull> => {
  const response = await axios.get<FrameFull>(`${API_URL}/${id}/full`);
  return response.data;
};

export const addFrame = async (name: string): Promise<Frame> => {
  const response = await axios.post<Frame>(API_URL, { name });
  return response.data;
};

export const deleteFrame = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateFrame = async (id: number, name: string): Promise<Frame> => {
  const response = await axios.put<Frame>(`${API_URL}/${id}`, { name });
  return response.data;
};
