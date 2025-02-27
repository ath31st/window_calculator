import {
  addFrameBlock,
  changeFormula,
  deleteFrameBlock,
  updateFrameBlock,
} from '@/services/frame.block.service';
import { FrameBlock, FrameBlockFull, NewFrameBlock } from '@/types/api';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { useGlobalErrorStore } from './global.error.store';

interface FrameBlockStore {
  frameBlocksFull: FrameBlockFull[];
  loading: boolean;
  addFrameBlock: (frameBlock: NewFrameBlock) => Promise<void>;
  updateFrameBlock: (frameBlock: FrameBlock) => Promise<void>;
  deleteFrameBlock: (id: number) => Promise<void>;
  changeFormula: (id: number, formula: string) => Promise<void>;
  setFrameBlocks: (blocks: FrameBlockFull[]) => void;
  handleError: (error: unknown) => void;
}

export const useFrameBlockStore = create<FrameBlockStore>((set) => ({
  frameBlocksFull: [],
  loading: false,

  handleError: (error: unknown) => {
    console.log(error);
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = `Error code: ${statusCode}. ${error.response?.data?.error}`;
      useGlobalErrorStore.getState().setError(message);
    } else {
      useGlobalErrorStore.getState().setError('Unknown error');
    }
  },

  setFrameBlocks: (blocks: FrameBlockFull[]) => {
    set({ frameBlocksFull: blocks });
  },

  addFrameBlock: async (frameBlock: NewFrameBlock) => {
    try {
      const createdBlock = await addFrameBlock(frameBlock);

      const frameBlockFull: FrameBlockFull = {
        ...createdBlock,
        blockTables: [],
      };

      set((state) => ({
        frameBlocksFull: [...state.frameBlocksFull, frameBlockFull],
      }));
    } catch (err) {
      useFrameBlockStore.getState().handleError(err);
    }
  },

  updateFrameBlock: async (frameBlock: FrameBlock) => {
    try {
      const updatedBlock = await updateFrameBlock(frameBlock);
      set((state) => ({
        frameBlocksFull: state.frameBlocksFull.map((block) =>
          block.id === updatedBlock.id ? { ...block, ...updatedBlock } : block,
        ),
      }));
    } catch (err) {
      useFrameBlockStore.getState().handleError(err);
    }
  },

  deleteFrameBlock: async (id: number) => {
    try {
      await deleteFrameBlock(id);
      set((state) => ({
        frameBlocksFull: state.frameBlocksFull.filter(
          (block) => block.id !== id,
        ),
      }));
    } catch (err) {
      useFrameBlockStore.getState().handleError(err);
    }
  },

  changeFormula: async (id: number, formula: string) => {
    try {
      await changeFormula(id, formula);
      set((state) => ({
        frameBlocksFull: state.frameBlocksFull.map(
          (block) => (block.id === id ? { ...block, formula } : block),
        ),
      }));
    } catch (err) {
      useFrameBlockStore.getState().handleError(err);
    }
  },
}));
