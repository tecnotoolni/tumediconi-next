import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/User';

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UseAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
