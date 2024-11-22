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

import SizeForm from './size-form';
import { IPizzaSize } from '@/types/size';

interface Props {
	size: IPizzaSize | null;
	isOpen: boolean;
	handleClose: (open: boolean) => void;
	setList: React.Dispatch<React.SetStateAction<IPizzaSize[]>>;
}

export default function SizeDialog({ size, isOpen, handleClose, setList }: Props) {
	return (
		<Dialog open={isOpen || !!size} onOpenChange={handleClose}>
			<DialogTrigger asChild>
				<Button className='bg-green hover:bg-green/60'>
					<Plus className='mr-2 h-4 w-4' /> Thêm Kích thước
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{size ? 'Chỉnh sửa' : 'Thêm mới Kích thước'}</DialogTitle>
				</DialogHeader>
				<div>
					<SizeForm size={size} setList={setList} handleClose={handleClose}/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
