'use client';
import CartStatusRender from '@/components/admin/cart-status.render';
import PaymenStatus from '@/components/admin/payment-status';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { currency } from '@/shared/constants';
import { IOrder } from '@/types/order';
import { formatDate } from 'date-fns';
import DetailCard from './detail-card';
import { Button } from '@/components/ui/button';

interface Props {
	order: IOrder;
	setOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
}

export default function OrderDetail({ order, setOrder }: Props) {
	return (
		<Dialog
			open={true}
			onOpenChange={(value) => {
				if (!value) setOrder(null);
			}}
		>
			<DialogContent>
				<DialogTitle className='items-center flex gap-2'>
					<CartStatusRender status={order!.status} />
					Order Detail
				</DialogTitle>
				<DialogDescription>
					<p>
						Date created:{' '}
						<span className='font-semibold'>
							{formatDate(new Date(order!.$createdAt!), 'HH:mm dd/MM/yyyy')}
						</span>
					</p>
					<p>
						Last Modified:{' '}
						<span className='font-semibold'>
							{formatDate(new Date(order.$updatedAt!), 'HH:mm dd/MM/yyyy')}
						</span>
					</p>
				</DialogDescription>
				<div>
					<p>
						Order ID: <span className='font-semibold'>{order?.$id}</span>
					</p>
					<p>
						Customer:{' '}
						<span className='font-semibold'>
							{order?.users?.fullName ?? order?.name}
						</span>
					</p>
					<p>
						Phone number:{' '}
						<span className='font-semibold'>{order?.phoneNumber}</span>
					</p>
					<p>
						Address:{' '}
						<span className='font-semibold'>
							{order?.deliveryAddress ?? 'None'}
						</span>
					</p>
					<div className='h-[2px] w-full bg-gray-200 my-2' />
					<p>
						Total price:{' '}
						<span className='font-semibold'>
							{order?.finalPrice.toLocaleString()} {currency}
						</span>
					</p>

					<p>
						Payment Method:{' '}
						<span className='font-semibold'>{order?.paymentMethod}</span>
					</p>
					<p>
						Payment Status: <PaymenStatus status={order.paymentStatus} />
					</p>
					<p>List Items:</p>
					<div className='grid grid-cols-2 gap-2 mt-2 max-h-[45vh] overflow-auto pb-2'>
						{order?.items?.map((item) => (
							<DetailCard key={item.$id} cartItem={item} />
						))}
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => setOrder(null)}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
