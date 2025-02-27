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
import { useGlobalErrorStore } from './global.error.store';

interface UserStore {
  user: User | null;
  users: User[];
  loading: boolean;
  fetchUser: (id: number) => void;
  fetchUsers: () => void;
  addUser: (user: NewUser) => void;
  updateUser: (user: UpdateUser) => void;
  changeUserPassword: (changePassword: ChangePassword) => void;
  deleteUser: (id: number) => void;
  setUser: (user: User | null) => void;
  handleError: (error: unknown) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  users: [],
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
        user: state.user?.id === updatedUser.id ? updatedUser : state.user,
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
      const currentUser = useUserStore.getState().user;
      if (currentUser?.id === id) {
        useGlobalErrorStore.getState().setError('You cannot delete yourself.');
        return;
      }

      await deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (error) {
      useUserStore.getState().handleError(error);
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user: User | null) => set({ user }),
}));
