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
					Chi tiết đơn hàng
				</DialogTitle>
				<DialogDescription>
					<p>
						Ngày tạo đơn:{' '}
						<span className='font-semibold'>
							{formatDate(new Date(order!.$createdAt!), 'HH:mm dd/MM/yyyy')}
						</span>
					</p>
					<p>
						Cập nhật lần cuối:{' '}
						<span className='font-semibold'>
							{formatDate(new Date(order.$updatedAt!), 'HH:mm dd/MM/yyyy')}
						</span>
					</p>
				</DialogDescription>
				<div>
					<p>
						Mã đơn hàng: <span className='font-semibold'>{order?.$id}</span>
					</p>
					<p>
						Khách hàng:{' '}
						<span className='font-semibold'>
							{order?.user?.fullName ?? order?.name}
						</span>
					</p>
					<p>
						Số điện thoại:{' '}
						<span className='font-semibold'>{order?.phoneNumber}</span>
					</p>
					<p>
						Địa chỉ giao hàng:{' '}
						<span className='font-semibold'>
							{order?.deliveryAddress ?? 'Không có'}
						</span>
					</p>
					<div className='h-[2px] w-full bg-gray-200 my-2' />
					<p>
						Giá trị đơn hàng:{' '}
						<span className='font-semibold'>
							{order?.finalPrice.toLocaleString()} {currency}
						</span>
					</p>

					<p>
						Phương thức thanh toán:{' '}
						<span className='font-semibold'>{order?.paymentMethod}</span>
					</p>
					<p>
						Trạng thái thanh toán: <PaymenStatus status={order.paymentStatus} />
					</p>
					<p>Danh sách món:</p>
					<div className='grid grid-cols-2 gap-2 mt-2 max-h-[45vh] overflow-auto pb-2'>
						{order?.items?.map((item) => (
							<DetailCard key={item.$id} cartItem={item} />
						))}
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => setOrder(null)}>
						Đóng
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
