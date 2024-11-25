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
					Make you Pizza
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Build your Dream Pizza</DialogTitle>
				<DialogDescription>
					This service is only available for logged in users that want to build
					their own pizza. DELIVERY is not available.
				</DialogDescription>
				<div className='max-h-[80vh] overflow-auto px-1'>
					{user && <BuildNowForm />}
					{!user && (
						<div className='text-2xl font-semibold flex-center text-center flex-col gap-2 text-red h-[30vh]'>
							Please login to build your pizza
							<Link href='/login'>
								<Button className='bg-brand hover:bg-brand/80 rounded-full'>
									Login now
								</Button>
							</Link>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
