import {
  addTableButton,
  deleteTableButton,
  updateTableButton,
} from '@/services/table.button.service';
import { NewTableButton, TableButton } from '@/types/api';
import { AxiosError } from 'axios';
import { create } from 'zustand';

interface TableButtonStore {
  tableButtons: TableButton[];
  loading: boolean;
  error: string | null;
  setTableButtons: (tableButtons: TableButton[]) => void;
  addTableButton: (tableButton: NewTableButton) => void;
  updateTableButton: (tableButton: TableButton) => void;
  deleteTableButton: (id: number) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

export const useTableButtonStore = create<TableButtonStore>((set) => ({
  tableButtons: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const message = `${error.response?.data?.message} ${statusCode}`;
      set({ error: message });
    } else {
      set({ error: 'Unknown error' });
    }
  },

  setTableButtons: (tableButtons: TableButton[]) => set({ tableButtons }),

  addTableButton: async (tableButton: NewTableButton) => {
    try {
      const createdTableButton = await addTableButton(tableButton);

      set((state) => ({
        tableButtons: [...state.tableButtons, createdTableButton],
      }));
    } catch (error) {
      useTableButtonStore.getState().handleError(error);
    }
  },

  updateTableButton: async (tableButton: TableButton) => {
    try {
      const updatedTableButton = await updateTableButton(tableButton);

      set((state) => ({
        tableButtons: state.tableButtons.map((tb) =>
          tb.id === tableButton.id ? updatedTableButton : tb,
        ),
      }));
    } catch (error) {
      useTableButtonStore.getState().handleError(error);
    }
  },

  deleteTableButton: async (id: number) => {
    try {
      await deleteTableButton(id);

      set((state) => ({
        tableButtons: state.tableButtons.filter((tb) => tb.id !== id),
      }));
    } catch (error) {
      useTableButtonStore.getState().handleError(error);
    }
  },
}));
