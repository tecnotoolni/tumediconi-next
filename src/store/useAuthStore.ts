import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserAuthenticated } from '@/types/User';
import FileData from '@/types/FileData';
import { Doctor } from '@/types/Doctor';

type AuthState = {
  user: UserAuthenticated | null;
  setUser: (user: UserAuthenticated | null) => void;
  setUserAvatar: (avatar: FileData) => void;
  setUserDoctor: (doctor: Doctor) => void;
};

export const UseAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      setUserAvatar: (avatar) => set((state) => ({
        user: {
          ...state.user,
          avatar,
        } as UserAuthenticated,
      })),
      setUserDoctor: (doctor) => set((state) => ({
        user: {
          ...state.user,
          doctor,
        } as UserAuthenticated,
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
