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
	setListTopping: React.Dispatch<React.SetStateAction<ITopping[]>>;
}

export default function ToppingDialog({
	topping,
	isOpen,
	handleClose,
	setListTopping,
}: Props) {
	return (
		<Dialog open={isOpen || !!topping} onOpenChange={handleClose}>
			<DialogTrigger asChild>
				<Button className='bg-green hover:bg-green/60'>
					<Plus className='mr-2 h-4 w-4' /> Add Topping
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{topping ? 'Update Topping' : 'Add Topping'}
					</DialogTitle>
				</DialogHeader>
				<div>
					<ToppingForm
						topping={topping}
						setListTopping={setListTopping}
						handleClose={handleClose}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
