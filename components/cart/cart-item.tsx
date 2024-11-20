'use client';

import { ICartItem, useCartStore } from '@/lib/stores/use-cart-store';
import { currency } from '@/shared/constants';
import { TrashIcon } from 'lucide-react';
import { useMemo } from 'react';
import ToppingDropdown from './topping-dropdown';

interface Props {
	item: ICartItem;
}

export default function CartItem({ item }: Props) {
	const { updateCart, removeCart, updateTopping } = useCartStore();

	const handlePlus = (item: ICartItem) => {
		updateCart('increase', item, 1);
	};

	const handleMinus = (item: ICartItem) => {
		updateCart('decrease', item, 1);
	};

	const handleRemoveToping = (item: ICartItem, topping: ITopping) => {
		updateTopping('remove', item, topping);
	};

	const finalPrice = useMemo(() => {
		return (
			item.price * item.quantity +
			item.toppings.reduce((total, topping) => total + topping.price, 0)
		);
	}, [item.price, item.quantity, item.toppings]);

	return (
		<div
			key={`${item.id}-${item.size}`}
			className='bg-white p-4 rounded-lg shadow flex flex-col justify-between gap-2 relative'
		>
			<div>
				<h3 className='font-bold text-xl'>
					{item.name} ({item.size.name})
				</h3>
				<p className='text-gray-500'>
					{item.price.toLocaleString()} {currency}
				</p>

				<div className='space-y-1'>
					<p className='text-gray-500'>
						Toppings: <ToppingDropdown item={item} />
					</p>
					{item.toppings.map((topping) => (
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
				<span className='text-center text-lg font-semibold'>{item.quantity}</span>
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
					onClick={() => removeCart(item)}
					className='text-gray-400 hover:text-brand transition-colors'
				>
					<TrashIcon className='h-5 w-5' />
				</button>
			</div>
		</div>
	);
}
