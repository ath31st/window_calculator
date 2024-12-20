import { create } from 'zustand';

interface GlobalErrorStore {
  error: string | null;
  setError: (error: string | null) => void;
}

export const useGlobalErrorStore = create<GlobalErrorStore>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));
