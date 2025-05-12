import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserAuthenticated } from '@/types/User';

type AuthState = {
  user: UserAuthenticated | null;
  setUser: (user: UserAuthenticated | null) => void;
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
