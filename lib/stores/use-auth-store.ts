import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
	user: IUser | null;
	setUser: (user: IUser | null) => void;
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
