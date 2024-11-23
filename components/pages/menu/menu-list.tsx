'use client';

import { useEffect, useState } from 'react';
import PizzaCard from '../../pizza-card';
import { Button } from '../../ui/button';
import { Loader2 } from 'lucide-react';
import { IPizza } from '@/types/pizza';
import { getPizzasByCatSlug } from '@/lib/actions/pizza.action';
import { APP_NAME } from '@/shared/constants';

interface Props {
	slug: string | undefined;
}

export default function MenuList({ slug }: Props) {
	const [data, setData] = useState<IPizza[]>([]);
	const [isLoading, setLoading] = useState(false);

	const fetchPizzas = async () => {
		setLoading(true);
		const pizzas = await getPizzasByCatSlug(slug ?? 'all');
		setData(pizzas);
		setLoading(false);
	};

	useEffect(() => {
		fetchPizzas();
	}, [slug]);

	return (
		<div className='space-y-6'>
			{isLoading && (
				<div className='text-center text-2xl'>
					<Loader2 className='animate-spin mr-2 inline-block' /> {APP_NAME} đang
					tìm kiếm, chờ chút nhé...
				</div>
			)}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{data.map((item) => (
					<PizzaCard pizza={item} key={item.$id} />
				))}
				{data.length === 0 && (
					<p className='text-center text-2xl text-gray-400 col-span-4'>
						No pizzas found.
					</p>
				)}
			</div>
			{data.length != 0 && (
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
			)}
		</div>
	);
}
