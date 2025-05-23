import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserAuthenticated } from '@/types/User';
import FileData from '@/types/FileData';
import { Doctor } from '@/types/Doctor';
import { Patient } from '@/types/Patient';

type AuthState = {
  user: UserAuthenticated | null;
  setUser: (user: UserAuthenticated | null) => void;
  setUserAvatar: (avatar: FileData) => void;
  setUserDoctor: (doctor: Doctor) => void;
  setUserPatient: (patient: Patient) => void;
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
      setUserPatient: (patient) => set((state) => ({
        user: {
          ...state.user,
          patient,
        } as UserAuthenticated,
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
