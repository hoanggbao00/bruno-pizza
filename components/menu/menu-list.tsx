'use client';

import { useState } from 'react';
import PizzaCard from '../pizza-card';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
	initialData: IPizza[];
}

export default function MenuList({ initialData }: Props) {
	const [data, setData] = useState(initialData);
	const [isLoading, setLoading] = useState(false);

	return (
		<div className='space-y-6'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{data.map((item) => (
					<PizzaCard pizza={item} key={item.id} />
				))}
			</div>
			<div className='flex-center'>
				<Button
					variant='outline'
					className='!font-medium border-brand rounded-full border-2 group relative !bg-transparent hover:text-white overflow-hidden text-lg'
					disabled={isLoading}
				>
					<div className='bg-brand-100 absolute inset-y-0 left-0 right-0 transition-all rounded-full -z-[1] -translate-x-[105%] group-hover:translate-x-0 duration-300' />

					{isLoading && <Loader2 className='animate-spin' />}
					{isLoading
						? 'Bruno Pizzeria is serving you...'
						: 'I want more Pizzas!'}
				</Button>
			</div>
		</div>
	);
}
