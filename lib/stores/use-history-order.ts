import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
	ids: string[];
	setIds: (ids: string[]) => void;
	removeId: (id: string) => void;
}

export const useHistoryOrder = create(
	persist<State>(
		(set) => ({
			ids: [],
			setIds: (ids) => set({ ids }),
			removeId: (id) =>
				set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
		}),
		{
			name: 'history-order',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
