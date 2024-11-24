'use client';

import { useEffect, useState } from 'react';
import PizzaCard from '../../pizza-card';
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
				{!isLoading && data.map((item) => (
					<PizzaCard pizza={item} key={item.$id} />
				))}
				{!isLoading && data.length === 0 && (
					<p className='text-center text-2xl text-gray-400 col-span-4'>
						Không tìm thấy pizza nào
					</p>
				)}
			</div>
		</div>
	);
}
