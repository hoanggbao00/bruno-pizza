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

import VoucherForm from './voucher-form';
import { IVoucher } from '@/types/voucher';

interface Props {
	voucher: IVoucher | null;
	isOpen: boolean;
	handleClose: (open: boolean) => void;
	setListVoucher: React.Dispatch<React.SetStateAction<IVoucher[]>>;
}

export default function VoucherDialog({ voucher, isOpen, handleClose, setListVoucher }: Props) {
	return (
		<Dialog open={isOpen || !!voucher} onOpenChange={handleClose}>
			<DialogTrigger asChild>
				<Button className='bg-green hover:bg-green/60'>
					<Plus className='mr-2 h-4 w-4' /> Add Voucher
				</Button>
			</DialogTrigger>
			<DialogContent className='md:min-w-[600px]'>
				<DialogHeader>
					<DialogTitle>{voucher ? 'Update Voucher' : 'Add voucher'}</DialogTitle>
				</DialogHeader>
				<div>
					<VoucherForm voucher={voucher} setListVoucher={setListVoucher} handleClose={handleClose}/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
