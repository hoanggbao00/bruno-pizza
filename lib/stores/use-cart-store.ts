import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UpdateType = 'increase' | 'decrease';

export interface ICartItem {
	id: string;
	name: string;
	images: string[];
	size: IPizzaSize;
	price: number;
	quantity: number;
	toppings: ITopping[];
	listTopping: ITopping[];
}

export interface ICartStore {
	items: ICartItem[];
	updateCart: (type: UpdateType, item: ICartItem, quantity?: number) => void;
	removeCart: (item: ICartItem) => void;
	clearCart: () => void;
	getTotalPrice: () => number;
	updateTopping: (
		type: 'add' | 'remove',
		item: ICartItem,
		topping: ITopping
	) => void;
}

export const useCartStore = create(
	persist<ICartStore>(
		(set, get) => ({
			items: [],
			updateCart: (type, item, quantity = 1) => {
				const foundItem = get().items.find(
					(cartItem) =>
						cartItem.id === item.id &&
						cartItem.size.id === item.size.id &&
						cartItem.toppings.length == item.toppings.length &&
						cartItem.toppings.every((topping) =>
							item.toppings.find((t) => t.id === topping.id)
						)
				);

				if (foundItem) {
					set((state) => ({
						items: state.items.map((cartItem) =>
							cartItem.id === item.id &&
							cartItem.size.id === item.size.id &&
							cartItem.toppings.length == item.toppings.length &&
							cartItem.toppings.every((topping) =>
								item.toppings.find((t) => t.id === topping.id)
							)
								? {
										...cartItem,
										quantity:
											type === 'increase'
												? cartItem.quantity + quantity
												: cartItem.quantity - quantity,
								  }
								: cartItem
						),
					}));
				} else {
					set((state) => ({
						items: [...state.items, { ...item, quantity: 1 }],
					}));
				}
			},
			removeCart: (item) => {
				set((state) => ({
					items: state.items.filter((cartItem) => {
						return (
							cartItem.id == item.id &&
							cartItem.size.id == item.size.id &&
							!cartItem.toppings.every((topping) =>
								item.toppings.find((t) => t.id === topping.id)
							)
						);
					}),
				}));
			},
			clearCart: () => {
				set({ items: [] });
			},
			updateTopping: (type: 'add' | 'remove', item, topping) => {
				set((state) => ({
					items: state.items.map((cartItem) => {
						if (
							cartItem.id === item.id &&
							cartItem.size === item.size &&
							cartItem.toppings.every((topping) =>
								item.toppings.includes(topping)
							)
						) {
							if (type === 'add') {
								cartItem.toppings.push(topping);
							} else {
								cartItem.toppings = cartItem.toppings.filter(
									(t) => t.id !== topping.id
								);
							}
						}
						return cartItem;
					}),
				}));
			},
			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			},
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
