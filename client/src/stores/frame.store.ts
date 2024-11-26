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

interface FrameStore {
  frames: Frame[];
  frameFull: FrameFull | null;
  activeFrameId: number | null;
  loading: boolean;
  error: string | null;
  setActiveFrame: (id: number) => void;
  addFrame: (name: string) => void;
  deleteFrame: (id: number) => void;
  updateFrame: (id: number, newName: string) => void;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useFrameStore = create<FrameStore>((set) => ({
  frames: [],
  frameFull: null,
  activeFrameId: null,
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

  setActiveFrame: (id: number) => {
    set({ activeFrameId: id });
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
      set({ frameFull, loading: false });
    } catch (err) {
      set({ loading: false });
      useFrameStore.getState().handleError(err);
    }
  },
}));
