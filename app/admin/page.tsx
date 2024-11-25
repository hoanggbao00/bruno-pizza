'use client';
import AdminChart from '@/components/admin/admin-chart';
import { Button } from '@/components/ui/button';
// app/admin/page.tsx
import { Card } from '@/components/ui/card';
import { getTotalData } from '@/lib/actions/dashboard.action';
import { cn } from '@/lib/utils';
import {
	PizzaIcon,
	LayersIcon,
	ShoppingCartIcon,
	TicketIcon,
	Loader2,
	RefreshCcw,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function AdminDashboard() {
	const [total, setTotal] = useState({
		pizza: 0,
		category: 0,
		order: 0,
		voucher: 0,
	});
	const [totalLoading, setTotalLoading] = useState(true);

	const fetchTotal = async () => {
		setTotalLoading(true);
		try {
			const _ = await getTotalData();
			setTotal(_);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		} finally {
			setTotalLoading(false);
		}
	};

	const stats = useMemo(
		() => [
			{
				label: 'Pizzas',
				value: total.pizza,
				icon: PizzaIcon,
				path: '/admin/pizzas',
				color: 'brand hover:bg-brand/80',
			},
			{
				label: 'Categories',
				value: total.category,
				icon: LayersIcon,
				path: '/admin/categories',
				color: 'green hover:bg-green/80',
			},
			{
				label: 'Order Today',
				value: total.order,
				icon: ShoppingCartIcon,
				path: '/admin/orders',
				color: 'yellow-300 hover:bg-yellow-200/80',
			},
			{
				label: 'Voucher Active',
				value: total.voucher,
				icon: TicketIcon,
				path: '/admin/vouchers',
				color: 'blue hover:bg-blue/80',
			},
		],
		[total]
	);

	useEffect(() => {
		fetchTotal();
	}, []);

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<Button variant='outline' disabled={totalLoading} onClick={fetchTotal}>
					{totalLoading ? (
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<RefreshCcw className='size-4 mr-2' />
					)}
					Refresh
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.label} className={cn('p-6', `bg-${stat.color}`)}>
							<Link
								href={stat.path}
								className='flex items-center justify-between'
							>
								<div>
									<p className='text-sm text-black'>{stat.label}</p>
									{totalLoading ? (
										<Loader2 className='animate-spin inline-block size-5' />
									) : (
										<p className='text-3xl font-bold mt-1'>{stat.value}</p>
									)}
								</div>
								<Icon className='w-8 h-8 text-blue-500' />
							</Link>
						</Card>
					);
				})}
			</div>
			<div className='h-[2px] bg-gray-200 my-2' />
			<div>
				<AdminChart />
			</div>
		</div>
	);
}
