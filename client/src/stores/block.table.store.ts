import {
  addBlockTable,
  deleteBlockTable,
  updateBlockTable,
} from '@/services/block.table.service';
import { BlockTable, BlockTableFull, NewBlockTable } from '@/types/api';
import { AxiosError } from 'axios';
import { create } from 'zustand';

interface BlockTableStore {
  blockTablesFull: BlockTableFull[];
  loading: boolean;
  error: string | null;
  setBlockTables(blockTablesFull: BlockTableFull[]): void;
  addBlockTable: (blockTable: NewBlockTable) => Promise<void>;
  updateBlockTable: (blockTable: BlockTable) => Promise<void>;
  deleteBlockTable: (id: number) => Promise<void>;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

const useBlockTableStore = create<BlockTableStore>((set) => ({
  blockTablesFull: [],
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

  addBlockTable: async (blockTable: NewBlockTable) => {
    try {
      const createdBlockTable = await addBlockTable(blockTable);

      const blockTableFull: BlockTableFull = {
        ...createdBlockTable,
        tableButtons: [],
      };

      set((state) => ({
        blockTablesFull: [...state.blockTablesFull, blockTableFull],
      }));
    } catch (err) {
      useBlockTableStore.getState().handleError(err);
    }
  },

  updateBlockTable: async (blockTable: BlockTable) => {
    try {
      const updatedBlockTable = await updateBlockTable(blockTable);
      set((state) => ({
        blockTablesFull: state.blockTablesFull.map((bt) =>
          bt.id === blockTable.id ? { ...bt, ...updatedBlockTable } : bt,
        ),
      }));
    } catch (err) {
      useBlockTableStore.getState().handleError(err);
    }
  },

  deleteBlockTable: async (id: number) => {
    try {
      await deleteBlockTable(id);
      set((state) => ({
        blockTablesFull: state.blockTablesFull.filter((bt) => bt.id !== id),
      }));
    } catch (err) {
      useBlockTableStore.getState().handleError(err);
    }
  },

  setBlockTables: (blockTablesFull: BlockTableFull[]) => {
    set({ blockTablesFull });
  },
}));

export default useBlockTableStore;
