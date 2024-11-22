import { IUser } from '@/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
	user: Omit<IUser, '$createdAt' | '$updatedAt' | 'accountId'> | null;
	setUser: (user: Omit<IUser, '$createdAt' | '$updatedAt' | 'accountId'> | null) => void;
}

export const useAuthStore = create(
	persist<AuthState>(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
		}),
		{
			name: 'pizza-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
