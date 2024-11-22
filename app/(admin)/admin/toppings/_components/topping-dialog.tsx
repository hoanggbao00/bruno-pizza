'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Plus } from 'lucide-react';

import { ITopping } from '@/types/topping';
import ToppingForm from './topping-form';

interface Props {
	topping: ITopping | null;
	isOpen: boolean;
	handleClose: (open: boolean) => void;
}

export default function ToppingDialog({ topping, isOpen, handleClose }: Props) {
	return (
		<Dialog open={isOpen || !!topping} onOpenChange={handleClose}>
			<DialogTrigger asChild>
				<Button className='bg-green hover:bg-green/60'>
					<Plus className='mr-2 h-4 w-4' /> Thêm Topping
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{topping ? 'Chỉnh sửa' : 'Thêm mới Topping'}</DialogTitle>
				</DialogHeader>
				<div>
					<ToppingForm topping={topping} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
