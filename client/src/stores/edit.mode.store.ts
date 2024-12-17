import { create } from 'zustand';

interface EditModeState {
  isEditMode: boolean;
  toggleEditMode: () => void;
}

export const useEditModeStore = create<EditModeState>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
}));
