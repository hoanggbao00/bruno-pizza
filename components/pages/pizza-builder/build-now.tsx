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

export default function BuildNow() {
	const { user } = useAuthStore();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-brand hover:bg-brand/90 text-white rounded-full gap-2'>
					<ShoppingBag className='h-4 w-4' />
					Build Now
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Build Your Dream Pizza</DialogTitle>
				<DialogDescription>Dịch vụ này chỉ áp dụng cho khách đến dùng tại quán hoặc đến lấy mang về.
					Nếu muốn ship, vui lòng liên hệ của hàng.</DialogDescription>
				<div className='max-h-[80vh] overflow-auto px-1'>
					{user && <BuildNowForm />}
					{!user && (
						<div className='text-2xl font-semibold text-center text-red'>
							Vui lòng đăng nhập đề tiến hành build pizza
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
