import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  changeUserPassword,
  deleteUser,
} from '@/services/user.service';
import { ChangePassword, NewUser, UpdateUser, User } from '@/types/api';
import { AxiosError } from 'axios';
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUser: (id: number) => void;
  fetchUsers: () => void;
  addUser: (user: NewUser) => void;
  updateUser: (user: UpdateUser) => void;
  changeUserPassword: (changePassword: ChangePassword) => void;
  deleteUser: (id: number) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  users: [],
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

  fetchUser: async (id: number) => {
    set({ loading: true });
    try {
      const user = await getUser(id);
      set({ user });
    } catch (error) {
      useUserStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const users = await getUsers();
      set({ users });
    } catch (error) {
      useUserStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  addUser: async (user: NewUser) => {
    set({ loading: true });
    try {
      const savedUser = await createUser(user);
      set((state) => ({ users: [...state.users, savedUser] }));
    } catch (error) {
      useUserStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (user: UpdateUser) => {
    set({ loading: true });
    try {
      const updatedUser = await updateUser(user);
      set((state) => ({
        users: state.users.map((u) =>
          u.id === updatedUser.id ? updatedUser : u,
        ),
      }));
    } catch (error) {
      useUserStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  changeUserPassword: async (changePassword: ChangePassword) => {
    set({ loading: true });
    try {
      await changeUserPassword(changePassword);
    } catch (error) {
      useUserStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true });
    try {
      await deleteUser(id);
    } catch (error) {
      useUserStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },
}));
