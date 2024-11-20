'use client';

import { useCartStore } from '@/lib/stores/use-cart-store';
import { currency } from '@/shared/constants';
import CartEmpty from './cart-empty';
import CartItem from './cart-item';

export default function CartList() {
	const { items, clearCart, getTotalPrice } = useCartStore();

	return items.length == 0 ? (
		<CartEmpty />
	) : (
		<div>
			<div className='space-y-4'>
				{items.map((item, index) => (
					<CartItem item={item} key={item.id+''+index} />
				))}
			</div>
			<div className='h-[1px] bg-gray-200 mt-8 mb-1' />
			<div className='flex justify-end items-center mb-1'>
				<button
					className='text-brand/80 hover:text-brand-100 transition-colors'
					onClick={clearCart}
					type='button'
				>
					Xóa tất cả
				</button>
			</div>

			<div className='bg-white p-4 rounded-lg shadow'>
				<div className='flex justify-between items-center mb-4'>
					<span className='font-semibold'>Total:</span>
					<span className='text-xl font-bold text-brand'>
						{getTotalPrice().toLocaleString()} {currency}
					</span>
				</div>
				<button className='primary-btn w-full text-white py-3 rounded-lg hover:bg-red-700'>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
}
