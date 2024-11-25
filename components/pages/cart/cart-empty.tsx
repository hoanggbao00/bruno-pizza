'use client';

import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

export default function CartEmpty() {
	return (
		<div className='max-w-2xl mx-auto px-4 py-16 text-center'>
			<ShoppingCartIcon className='h-16 w-16 mx-auto text-gray-400 mb-4' />
			<h2 className='text-2xl font-semibold mb-4'>Oops! Your cart is empty!</h2>
			<p className='text-gray-500 mb-8'>
				Looks like you haven&apos;t added any pizzas yet.
			</p>
			<Link
				href='/menu'
				className='primary-btn p-2 px-6 bg-brand !font-medium !text-xl text-white'
			>
				Back to Explore
			</Link>
		</div>
	);
}
