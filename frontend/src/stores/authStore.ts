import { create } from 'zustand';
import type { User } from '../types/auth';
import * as authApi from '../api/authApi';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // true while rehydrating on app load
  rawToken: string | null; // held in memory only, for the Gmail OAuth flow later — never persisted

  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  rehydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  rawToken: null,

  login: async (email, password) => {
    const res = await authApi.login({ email, password });
    set({
      user: { fullName: res.fullName, email: res.email },
      isAuthenticated: true,
      rawToken: res.token,
    });
    // Fire a GET immediately so XSRF-TOKEN cookie is set before any POST/PATCH/DELETE
    await authApi.getCurrentUser();
  },

  register: async (fullName, email, password) => {
    const res = await authApi.register({ fullName, email, password });
    set({
      user: { fullName: res.fullName, email: res.email },
      isAuthenticated: true,
      rawToken: res.token,
    });
    await authApi.getCurrentUser();
  },

  logout: async () => {
    await authApi.logout();
    set({ user: null, isAuthenticated: false, rawToken: null });
  },

  rehydrate: async () => {
    try {
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));