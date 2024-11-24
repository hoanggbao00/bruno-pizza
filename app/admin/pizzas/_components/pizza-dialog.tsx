'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { IPizza } from '@/types/pizza';

import { Plus } from 'lucide-react';

import PizzaForm from './pizza-form';

interface Props {
	pizza: IPizza | null;
	isOpen: boolean;
	handleClose: (open: boolean) => void;
	setList: React.Dispatch<React.SetStateAction<IPizza[]>>;
}

export default function PizzaDialog({ pizza, isOpen, handleClose, setList }: Props) {
	return (
		<Dialog open={isOpen || !!pizza} onOpenChange={handleClose}>
			<DialogTrigger asChild>
				<Button className='bg-green hover:bg-green/60'>
					<Plus className='mr-2 h-4 w-4' /> Thêm Pizza
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{pizza ? 'Chỉnh sửa' : 'Thêm mới Pizza'}</DialogTitle>
				</DialogHeader>
				<div>
					<PizzaForm pizza={pizza} handleClose={handleClose} setList={setList}/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
