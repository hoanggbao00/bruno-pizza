'use client';

import { currency } from '@/shared/constants';
import { TrashIcon } from 'lucide-react';
import { useMemo } from 'react';
import ToppingDropdown from './topping-dropdown';
import useCartStore, { StoreCartItem } from '@/lib/stores/use-cart-store';
import { ITopping } from '@/types/topping';

interface Props {
	item: StoreCartItem;
}

export default function CartItem({ item }: Props) {
	const { updateItemQuantity, removeItem, updateItemToppings } = useCartStore();

	const handlePlus = (item: StoreCartItem) => {
		updateItemQuantity(item, item.quantity + 1);
	};

	const handleMinus = (item: StoreCartItem) => {
		if (item.quantity == 1) return removeItem(item);
		updateItemQuantity(item, item.quantity - 1);
	};

	const handleRemoveToping = (item: StoreCartItem, topping: ITopping) => {
		const newToppings = item.selectedToppings.filter(
			(t) => t.$id !== topping.$id
		);
		updateItemToppings(item, newToppings);
	};

	const finalPrice = useMemo(() => {
		const toppingsPrice = item.selectedToppings.reduce(
			(total, t) => total + t.price,
			0
		);
		return (
			(item.pizza.price + toppingsPrice + item.selectedSize.price) *
			item.quantity
		);
	}, [
		item.pizza.price,
		item.selectedSize.price,
		item.quantity,
		item.selectedToppings,
	]);

	return (
		<div className='bg-white p-4 rounded-lg shadow flex flex-col justify-between gap-2 relative'>
			<div>
				<h3 className='font-bold text-xl'>
					{item.pizza.name} ({item.selectedSize.name})
				</h3>
				<p className='text-gray-500'>
					{item.pizza.price.toLocaleString()} {currency}
				</p>

				<div className='space-y-1'>
					<p className='text-gray-500'>
						Toppings: <ToppingDropdown item={item} />
					</p>
					{item.selectedToppings.map((topping) => (
						<p key={topping.id} className='text-gray-500 text-sm'>
							- {topping.name}{' '}
							<span className='text-xs rounded-full p-0.5 px-1 bg-gray-400/30'>
								+ {topping.price.toLocaleString()}
								{currency}
							</span>
							<span
								className='cursor-pointer text-xs rounded-md text-brand hover:bg-gray-400/30 inline-block px-1'
								onClick={() => handleRemoveToping(item, topping)}
							>
								X
							</span>
						</p>
					))}
				</div>
			</div>
			<div className='h-[1px] bg-gray-300 my-1' />
			<div className='flex items-center justify-end gap-2'>
				<button
					onClick={() => handleMinus(item)}
					className='size-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
				>
					-
				</button>
				<span className='text-center text-lg font-semibold'>
					{item.quantity}
				</span>
				<button
					onClick={() => handlePlus(item)}
					className='size-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
				>
					+
				</button>
			</div>
			<p className='font-semibold text-right text-xl'>
				{finalPrice.toLocaleString()}
				{currency}
			</p>
			<div className='absolute top-2 right-2'>
				<button
					onClick={() => removeItem(item)}
					className='text-gray-400 hover:text-brand transition-colors'
				>
					<TrashIcon className='h-5 w-5' />
				</button>
			</div>
		</div>
	);
}
