'use client';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog';
import BuildNowForm from './build-now-form';
import { useAuthStore } from '@/lib/stores/use-auth-store';
import Link from 'next/link';

export default function BuildNow() {
	const { user } = useAuthStore();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-brand hover:bg-brand/90 text-white rounded-full gap-2'>
					<ShoppingBag className='h-4 w-4' />
					Tạo ý tưởng
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Xây dựng sự sáng tạo của bạn</DialogTitle>
				<DialogDescription>
					Dịch vụ này chỉ áp dụng cho khách đến dùng tại quán hoặc đến lấy mang
					về. Nếu muốn ship, vui lòng liên hệ của hàng.
				</DialogDescription>
				<div className='max-h-[80vh] overflow-auto px-1'>
					{user && <BuildNowForm />}
					{!user && (
						<div className='text-2xl font-semibold flex-center text-center flex-col gap-2 text-red h-[30vh]'>
							Vui lòng đăng nhập đề tiến hành build pizza
							<Link href='/login'>
								<Button className='bg-brand hover:bg-brand/80 rounded-full'>Đăng nhập ngay</Button>
							</Link>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
