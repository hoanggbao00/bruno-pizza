import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { checkPaid, getQrCodeUrl } from '@/lib/actions/qr.action';
import useCartStore from '@/lib/stores/use-cart-store';
import { currency } from '@/shared/constants';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
	qrCode: {
		cartId: string;
		price: number;
	};
	setQrCode: React.Dispatch<
		React.SetStateAction<{ cartId: string; price: number }>
	>;
}

export default function QRDialog({ qrCode, setQrCode }: Props) {
	const [isChecking, setChecking] = useState(false);
	const [qrUrl, setQrUrl] = useState('');
	const { clearCart } = useCartStore();
	const handleClose = () => {
		setQrCode({ cartId: '', price: 0 });
		clearCart();
	};

	const handleChecking = async () => {
		if (!qrCode.cartId) return;
		setChecking(true);
		try {
			const res = await checkPaid(qrCode.price);
			console.log(res)
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi kiểm tra');
		} finally {
			setChecking(false);
		}
	};

	useEffect(() => {
		if (qrCode.cartId) {
			const url = getQrCodeUrl(qrCode.cartId, qrCode.price);
			setQrUrl(url);
		}
	}, [qrCode]);

	return (
		<Dialog
			open={!!qrCode.cartId}
			onOpenChange={(value) => {
				if (!value) {
					setQrCode({ cartId: '', price: 0 });
					clearCart();
				}
			}}
		>
			<DialogContent>
				<DialogTitle>Quét mã thanh toán cho đơn hàng</DialogTitle>
				<div className='size-[300px] relative mx-auto'>
					<div className='absolute inset-0 z-0 bg-gray-400 grid place-items-center animate-pulse'>
						<Loader2 size={64} className='animate-spin' />
					</div>
					<img
						src={qrUrl}
						alt='QR Code'
						className='absolute inset-0 z-10 size-full'
					/>
				</div>
				<div>
					<p>
						Nội dung chuyển khoản:{' '}
						<span className='font-semibold'>{qrCode.cartId}</span>
					</p>
					<p>
						Số tiền chuyển:{' '}
						<span className='font-semibold'>
							{qrCode.price.toLocaleString()}
							{currency}
						</span>
					</p>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={handleClose}>
						Đóng
					</Button>
					<Button
						className='bg-green hover:bg-green/80 transition-colors'
						disabled={isChecking}
						onClick={handleChecking}
					>
						{isChecking && <Loader2 className='animate-spin mr-2' />}
						Kiểm tra
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
