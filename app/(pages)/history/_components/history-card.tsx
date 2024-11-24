import CartStatusRender from '@/components/admin/cart-status.render';
import PaymenStatus from '@/components/admin/payment-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CATEGORY_CUSTOM, currency } from '@/shared/constants';
import {
	EOrderStatus,
	EPaymentMethod,
	EPaymentStatus,
	IOrder,
} from '@/types/order';
import { formatDate } from 'date-fns';

interface Props {
	order: IOrder;
	setOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
	setQrCode: React.Dispatch<
		React.SetStateAction<{ cartId: string; price: number }>
	>;
}

export default function HistoryCard({ order, setOrder, setQrCode }: Props) {
	const date = new Date(order.$createdAt!);

	console.log(order.items)

	return (
		<div className='w-full p-2 rounded-md border'>
			{order.items[0].selectedSize?.name === 'Custom' && (
				<div className='mb-1'>
					<Badge className='bg-brand hover:!bg-brand'>Pizza Custom</Badge>
				</div>
			)}
			<p className='text-gray-500 text-sm mb-2'>
				Ngày tạo đơn: {formatDate(date, 'HH:mm dd/MM/yyyy')}
			</p>
			<div className='flex items-center justify-between'>
				<p className='font-semibold'>Mã đơn hàng: {order.$id}</p>
				<CartStatusRender status={order.status} />
			</div>
			<p>
				Khách hàng:{' '}
				<span className='font-semibold'>
					{order.user?.fullName ?? order.name}
				</span>
			</p>
			<p>
				Số lượng sản phẩm:{' '}
				<span className='font-semibold'>{order.items.length}</span>
			</p>
			<p>
				Tổng giá trị đơn hàng:{' '}
				<span className='font-semibold'>
					{order.finalPrice.toLocaleString()} {currency}
				</span>
			</p>
			<p>
				Phương thức thanh toán:{' '}
				<span className='font-semibold'>{order.paymentMethod}</span>
			</p>
			<p>
				Voucher:{' '}
				<span className='font-semibold'>
					{order.appliedVoucher ? order.appliedVoucher.name : 'Không'}
				</span>
			</p>
			<div className='h-[2px] w-full bg-gray-300 my-2' />
			<div className='flex items-center justify-end gap-2'>
				{order.status === EOrderStatus.PENDING &&
					order.paymentMethod === EPaymentMethod.BANKING &&
					order.paymentStatus === EPaymentStatus.UNPAID && (
						<Button
							onClick={() =>
								setQrCode({ cartId: order.$id, price: order.finalPrice })
							}
							variant='outline'
						>
							Nhấn để thanh toán
						</Button>
					)}

				{order.paymentMethod === EPaymentMethod.BANKING &&
					order.paymentStatus === EPaymentStatus.PAID && (
						<PaymenStatus status={order.paymentStatus} />
					)}
				<Button onClick={() => setOrder(order)} variant='outline'>
					Xem chi tiết
				</Button>
			</div>
		</div>
	);
}
