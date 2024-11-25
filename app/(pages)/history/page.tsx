'use client';

import { getOrderByListId } from '@/lib/actions/order.action';
import { useHistoryOrder } from '@/lib/stores/use-history-order';
import { IOrder } from '@/types/order';
import { useEffect, useState } from 'react';
import HistoryCard from './_components/history-card';
import OrderDetail from '@/app/admin/orders/_components/order-detail';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import QRDialog from '@/components/pages/cart/qr-dialog';

export default function Page() {
	const [listOrder, setListOrder] = useState<IOrder[]>([]);
	const [order, setOrder] = useState<IOrder | null>(null);
	const { ids } = useHistoryOrder();
	const [loading, setLoading] = useState(true);
	const [qrCode, setQrCode] = useState({
		cartId: '',
		price: 0,
	});

	const fetchOrders = async () => {
		setLoading(true);
		try {
			const res = await getOrderByListId(ids);
			setListOrder(res);
			toast.success('Refreshed');
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (ids.length > 0) fetchOrders();
	}, [ids]);

	return (
		<main className='max-w-2xl mx-auto px-4 py-8'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold mb-8'>Order History</h1>
				<Button disabled={loading} variant='outline' onClick={fetchOrders}>
					{loading ? (
						<Loader2 className='w-4 h-4 mr-2 animate-spin' />
					) : (
						<RefreshCcw className='size-4' />
					)}
					Refresh
				</Button>
			</div>
			<div className='flex flex-col gap-2'>
				{!loading && listOrder.length === 0 && (
					<div className='flex flex-col items-center justify-center'>
						<p className='font-semibold text-2xl'>No order found</p>
						<Link href='/menu'>
							<Button className='mt-4 bg-brand hover:bg-brand/80'>
								Order Now
							</Button>
						</Link>
					</div>
				)}
				{listOrder.map((item) => (
					<HistoryCard
						key={item.$id}
						order={item}
						setOrder={setOrder}
						setQrCode={setQrCode}
					/>
				))}
				<QRDialog qrCode={qrCode} setQrCode={setQrCode} />
			</div>
			{order && <OrderDetail order={order} setOrder={setOrder} />}
		</main>
	);
}
