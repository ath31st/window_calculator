import {
  addFrameBlock,
  deleteFrameBlock,
  updateFrameBlock,
} from '@/services/frame.block.service';
import { FrameBlock, FrameBlockFull, NewFrameBlock } from '@/types/api';
import { AxiosError } from 'axios';
import { create } from 'zustand';

interface FrameBlockStore {
  frameBlocksFull: FrameBlockFull[];
  loading: boolean;
  error: string | null;
  addFrameBlock: (frameBlock: NewFrameBlock) => Promise<void>;
  updateFrameBlock: (frameBlock: FrameBlock) => Promise<void>;
  deleteFrameBlock: (id: number) => Promise<void>;
  setFrameBlocks: (blocks: FrameBlockFull[]) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

export const useFrameBlockStore = create<FrameBlockStore>((set) => ({
  frameBlocksFull: [],
  loading: false,
  error: null,

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

  setFrameBlocks: (blocks: FrameBlockFull[]) => {
    set({ frameBlocksFull: blocks });
  },

  addFrameBlock: async (frameBlock: NewFrameBlock) => {
    try {
      await addFrameBlock(frameBlock);
    } catch (err) {
      useFrameBlockStore.getState().handleError(err);
    }
  },

  updateFrameBlock: async (frameBlock: FrameBlock) => {
    try {
      await updateFrameBlock(frameBlock);
    } catch (err) {
      useFrameBlockStore.getState().handleError(err);
    }
  },

  deleteFrameBlock: async (id: number) => {
    try {
      await deleteFrameBlock(id);
    } catch (err) {
      useFrameBlockStore.getState().handleError(err);
    }
  },
}));
