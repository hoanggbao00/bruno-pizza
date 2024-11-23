'use client';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { currency } from '@/shared/constants';
import { Eye, Loader2, RefreshCcw, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useConfirm } from '@/lib/stores/use-confirm';
import { toast } from 'sonner';
import { EOrderStatus, EPaymentStatus, IOrder } from '@/types/order';
import {
	deleteOrder,
	getOrders,
	updateOrder,
} from '@/lib/actions/order.action';
import { format } from 'date-fns';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CartStatusRender from '@/components/admin/cart-status.render';
import PaymenStatus from '@/components/admin/payment-status';
import OrderDetail from './_components/order-detail';

export default function Page() {
	const [listOrder, setListOrder] = useState<IOrder[]>([]);
	const [loading, setLoading] = useState(false);
	const [statusLoading, setStatusLoading] = useState(false);
	const [paymentLoading, setPaymentLoading] = useState(false);
	const [order, setOrder] = useState<IOrder | null>(null);
	const { confirm } = useConfirm();

	const fetchOrders = async () => {
		setLoading(true);
		try {
			const res = await getOrders();
			setListOrder(res);
			toast.success('Đã làm mới');
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi lấy dữ liệu Order!');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (item: IOrder) => {
		await confirm.danger(
			`Bạn có chắc chắn muốn xóa đơn hàng này?`,
			async () => {
				try {
					await deleteOrder(item.$id);

					toast.success(`Đã xóa ${item.name}`);
					setListOrder((prev) => prev.filter((c) => c.$id !== item.$id));
				} catch (error) {
					console.log(error);
					toast.error('Có lỗi xảy ra khi xóa!');
				}
			}
		);
	};

	const handleUpdateStatus = async (itemId: string, status: EOrderStatus) => {
		setStatusLoading(true);
		try {
			const res = await updateOrder(itemId, { status });
			setListOrder((prev) =>
				prev.map((item) => (item.$id === itemId ? { ...item, status } : item))
			);
			toast.success('Đã cập nhật trạng đơn hàng!');
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi cập nhật trạng đơn hàng!');
		} finally {
			setStatusLoading(false);
		}
	};

	const handleUpdatePaymentStatus = async (
		itemId: string,
		status: EPaymentStatus
	) => {
		setPaymentLoading(true);
		try {
			const res = await updateOrder(itemId, { paymentStatus: status });
			setListOrder((prev) =>
				prev.map((item) =>
					item.$id === itemId ? { ...item, paymentStatus: status } : item
				)
			);
			toast.success('Đã cập nhật trạng thái thanh toán!');
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi cập nhật trạng thanh toán!');
		} finally {
			setPaymentLoading(false);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div>
			{order && <OrderDetail key={order.$id} order={order} setOrder={setOrder} />}
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Đơn hàng</h1>
				<Button variant='outline' onClick={fetchOrders} disabled={loading}>
					{loading ? (
						<Loader2 size={16} className='animate-spin inline-block mr-2' />
					) : (
						<RefreshCcw />
					)}{' '}
					Làm mới
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center font-semibold w-[50px]'>
							#
						</TableHead>
						<TableHead className='text-center font-semibold'>
							Mã đơn hàng
						</TableHead>
						<TableHead className='text-center font-semibold'>
							{statusLoading && (
								<Loader2 size={16} className='animate-spin inline-block mr-2' />
							)}
							Trạng thái
						</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							Khách hàng
						</TableHead>
						<TableHead className='text-center font-semibold'>Giá trị</TableHead>
						<TableHead className='text-center font-semibold'>
							{paymentLoading && (
								<Loader2 size={16} className='animate-spin inline-block mr-2' />
							)}
							Thanh toán
						</TableHead>
						<TableHead className='text-center font-semibold'>Voucher</TableHead>
						<TableHead className='text-center font-semibold'>
							Ngày tạo
						</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							Hành động
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{listOrder.map((item, index) => (
						<TableRow key={item.$id}>
							<TableCell className='text-center'>{index + 1}</TableCell>
							<TableCell className='text-center'>{item.$id}</TableCell>
							<TableCell className='text-center'>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<CartStatusRender status={item.status} />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(item.$id, EOrderStatus.PENDING)
											}
										>
											<CartStatusRender status={EOrderStatus.PENDING} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(item.$id, EOrderStatus.CANCELED)
											}
										>
											<CartStatusRender status={EOrderStatus.CANCELED} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(item.$id, EOrderStatus.DONE)
											}
										>
											<CartStatusRender status={EOrderStatus.DONE} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(item.$id, EOrderStatus.DELIVERING)
											}
										>
											<CartStatusRender status={EOrderStatus.DELIVERING} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(item.$id, EOrderStatus.MAKING)
											}
										>
											<CartStatusRender status={EOrderStatus.MAKING} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(item.$id, EOrderStatus.REJECTED)
											}
										>
											<CartStatusRender status={EOrderStatus.REJECTED} />
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
							<TableCell className='text-center'>
								{item.user?.fullName ?? item.name}
							</TableCell>
							<TableCell className='text-center'>
								{item.finalPrice.toLocaleString()} {currency}
							</TableCell>
							<TableCell className='text-center'>
								<p>{item.paymentMethod}</p>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<PaymenStatus status={item.paymentStatus} />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() =>
												handleUpdatePaymentStatus(
													item.$id,
													EPaymentStatus.UNPAID
												)
											}
										>
											<PaymenStatus status={EPaymentStatus.UNPAID} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdatePaymentStatus(
													item.$id,
													EPaymentStatus.REFUNDED
												)
											}
										>
											<PaymenStatus status={EPaymentStatus.REFUNDED} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdatePaymentStatus(item.$id, EPaymentStatus.PAID)
											}
										>
											<PaymenStatus status={EPaymentStatus.PAID} />
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
							<TableCell className='text-center'>
								{item.appliedVoucher ? 'Có' : 'Không'}
							</TableCell>
							<TableCell className='text-center'>
								{format(new Date(item.$createdAt!), 'HH:mm dd/MM/yyyy')}
							</TableCell>
							<TableCell>
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										className='bg-blue/50 hover:bg-blue'
										onClick={() => setOrder(item)}
									>
										<Eye className='h-4 w-4' />
									</Button>
									<Button
										variant='outline'
										size='icon'
										className='bg-rose-400/50 hover:bg-rose-500'
										onClick={() => handleDelete(item)}
									>
										<Trash className='h-4 w-4' />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
