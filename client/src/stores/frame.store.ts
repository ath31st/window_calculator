import { Frame } from '@/types/api';
import { create } from 'zustand';

interface FrameStore {
  frames: Frame[];
  activeFrameId: number | null;
  addFrame: (name: string) => void;
  setActiveFrame: (id: number) => void;
}

export const useFrameStore = create<FrameStore>((set) => ({
  frames: [],
  activeFrameId: null,
  addFrame: (name) =>
    set((state) => ({
      frames: [...state.frames, { id: Date.now(), name }],
    })),
  setActiveFrame: (id) => set({ activeFrameId: id }),
}));
