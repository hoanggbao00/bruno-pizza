import { ICartItem } from '@/types/cart-item';
import { EOrderStatus } from '@/types/order';
import { IPizzaSize } from '@/types/size';
import { ITopping } from '@/types/topping';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type StoreCartItem = Omit<ICartItem, '$id'> & {
	listToppings: ITopping[];
};

interface CartStore {
	cartStatus: EOrderStatus | null;
	items: StoreCartItem[];
	addItem: (item: StoreCartItem) => void;
	removeItem: (item: StoreCartItem) => void;
	updateItemQuantity: (item: StoreCartItem, quantity: number) => void;
	clearCart: () => void;
	updateItemToppings: (item: StoreCartItem, toppings: ITopping[]) => void;
	updateItemSize: (item: StoreCartItem, sizeId: IPizzaSize) => void;
	getTotalPrice: () => number;
	setCartStatus: (status: EOrderStatus) => void;
}

const useCartStore = create(
	persist<CartStore>(
		(set, get) => ({
			cartStatus: null,
			items: [],
			addItem: (newItem) =>
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(item) =>
							item.pizzas.$id === newItem.pizzas.$id &&
							item.selectedSize.$id === newItem.selectedSize.$id &&
							JSON.stringify(item.selectedToppings) ===
								JSON.stringify(newItem.selectedToppings)
					);

					if (existingItemIndex > -1) {
						const updatedItems = [...state.items];
						updatedItems[existingItemIndex].quantity += newItem.quantity;
						return { items: updatedItems };
					}

					return { items: [...state.items, newItem] };
				}),

			removeItem: (newItem) => {
				const existingItemIndex = get().items.findIndex(
					(item) =>
						item.pizzas.$id === newItem.pizzas.$id &&
						item.selectedSize.$id === newItem.selectedSize.$id &&
						JSON.stringify(item.selectedToppings) ===
							JSON.stringify(newItem.selectedToppings)
				);

				if (existingItemIndex > -1) {
					const updatedItems = [...get().items];
					updatedItems.splice(existingItemIndex, 1);
					return set({ items: [...updatedItems] });
				}
			},

			updateItemQuantity: (newItem, quantity) =>
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(item) =>
							item.pizzas.$id === newItem.pizzas.$id &&
							item.selectedSize.$id === newItem.selectedSize.$id &&
							JSON.stringify(item.selectedToppings) ===
								JSON.stringify(newItem.selectedToppings)
					);

					if (existingItemIndex > -1) {
						const updatedItems = [...state.items];
						updatedItems[existingItemIndex].quantity = quantity;
						return { items: updatedItems };
					} else {
						return { items: [...state.items, newItem] };
					}
				}),
			updateItemSize: (newItem, size) =>
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(item) =>
							item.pizzas.$id === newItem.pizzas.$id &&
							item.selectedSize.$id === newItem.selectedSize.$id &&
							JSON.stringify(item.selectedToppings) ===
								JSON.stringify(newItem.selectedToppings)
					);

					if (existingItemIndex > -1) {
						const updatedItems = [...state.items];
						updatedItems[existingItemIndex].selectedSize = size;
						return { items: updatedItems };
					} else {
						return { items: [...state.items, newItem] };
					}
				}),
			updateItemToppings: (newItem, toppings) =>
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(item) =>
							item.pizzas.$id === newItem.pizzas.$id &&
							item.selectedSize.$id === newItem.selectedSize.$id &&
							JSON.stringify(item.selectedToppings) ===
								JSON.stringify(newItem.selectedToppings)
					);

					if (existingItemIndex > -1) {
						const updatedItems = [...state.items];
						updatedItems[existingItemIndex].selectedToppings = toppings;
						return { items: updatedItems };
					} else {
						return { items: [...state.items] };
					}
				}),

			clearCart: () => set({ items: [] }),

			getTotalPrice: () => {
				const totalItems = get().items;

				// tính tổng tiền
				const totalPrice = totalItems.reduce((total, item) => {
					// Tính tổng tièn topping
					const toppingsPrice = item.selectedToppings.reduce(
						(toppingTotal, topping) => toppingTotal + topping.price,
						0
					);

					// (tiền + tổng topping + size) * số lượng
					return (
						total +
						(item.pizzas.price + toppingsPrice + item.selectedSize.price) *
							item.quantity
					);
				}, 0);

				return totalPrice;
			},

			setCartStatus: (status) => set({ cartStatus: status }),
		}),
		{
			name: 'pizza-cart-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useCartStore;
