import {
  addFrame,
  deleteFrame,
  getFrameFull,
  getFrames,
  updateFrame,
} from '@/services/frame.service';
import { Frame, FrameFull } from '@/types/api';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { useFrameBlockStore } from './frame.block.store';
import useBlockTableStore from './block.table.store';
import { useTableButtonStore } from './table.button.store';
import { useGlobalErrorStore } from './global.error.store';

interface FrameStore {
  frames: Frame[];
  frameFull: FrameFull | null;
  activeFrameId: number | null;
  loading: boolean;
  fetchFrames: () => void;
  fetchFrameFull: (id: number) => void;
  addFrame: (name: string) => void;
  deleteFrame: (id: number) => void;
  updateFrame: (id: number, newName: string) => void;
  handleError: (error: unknown) => void;
}

export const useFrameStore = create<FrameStore>((set) => ({
  frames: [],
  frameFull: null,
  activeFrameId: null,
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

  fetchFrames: async () => {
    set({ loading: true });
    try {
      const frames = await getFrames();
      set({ frames, loading: false });
    } catch (err) {
      set({ loading: false });
      useFrameStore.getState().handleError(err);
    }
  },

  addFrame: async (name: string) => {
    try {
      const savedFrame = await addFrame(name);
      set((state) => ({
        frames: [...state.frames, savedFrame],
      }));
    } catch (err) {
      useFrameStore.getState().handleError(err);
    }
  },

  deleteFrame: async (id: number) => {
    try {
      await deleteFrame(id);
      set((state) => ({
        frames: state.frames.filter((frame) => frame.id !== id),
        frameFull: state.frameFull?.id === id ? null : state.frameFull,
      }));
    } catch (err) {
      useFrameStore.getState().handleError(err);
    }
  },

  updateFrame: async (id: number, newName: string) => {
    try {
      const updatedFrame = await updateFrame(id, newName);
      set((state) => ({
        frames: state.frames.map((frame) =>
          frame.id === id ? { ...frame, name: updatedFrame.name } : frame,
        ),
        frameFull:
          state.frameFull?.id === id
            ? { ...state.frameFull, name: updatedFrame.name }
            : state.frameFull,
      }));
    } catch (err) {
      useFrameStore.getState().handleError(err);
    }
  },

  fetchFrameFull: async (id: number) => {
    set({ loading: true });
    try {
      const frameFull = await getFrameFull(id);
      useFrameBlockStore.getState().setFrameBlocks(frameFull.frameBlocks);

      const blockTables = frameFull.frameBlocks.flatMap(
        (block) => block.blockTables || [],
      );
      useBlockTableStore.getState().setBlockTables(blockTables);

      const tableButtons = blockTables.flatMap(
        (blockTable) => blockTable.tableButtons || [],
      );
      useTableButtonStore.getState().setTableButtons(tableButtons);

      set({ frameFull, activeFrameId: id, loading: false });
    } catch (err) {
      set({ loading: false });
      useFrameStore.getState().handleError(err);
    }
  },
}));
