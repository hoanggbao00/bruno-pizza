'use client';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';

interface Props {
	isAdmin: boolean;
	setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminAuth({ isAdmin, setAdmin }: Props) {
	const [value, setValue] = useState('');

	useEffect(() => {
		if (value.length === 6) {
			if (value === process.env.NEXT_PUBLIC_AMDIN_PASSWORD) {
				setAdmin(true);
        toast.success('Hello Admin!');
			} else {
        toast.error('Wrong Password');
      }
		}
	}, [value]);

	return (
		<Dialog open={!isAdmin}>
			<DialogContent>
				<DialogTitle>ADMIN PASSWORD</DialogTitle>
				<div>
					<InputOTP maxLength={6} onChange={(value) => setValue(value)}>
						<InputOTPGroup>
							<InputOTPSlot index={0} className='size-[3.8rem] md:size-[4.8rem] text-4xl'/>
							<InputOTPSlot index={1} className='size-[3.8rem] md:size-[4.8rem] text-4xl'/>
							<InputOTPSlot index={2} className='size-[3.8rem] md:size-[4.8rem] text-4xl'/>
							<InputOTPSlot index={3} className='size-[3.8rem] md:size-[4.8rem] text-4xl'/>
							<InputOTPSlot index={4} className='size-[3.8rem] md:size-[4.8rem] text-4xl'/>
							<InputOTPSlot index={5} className='size-[3.8rem] md:size-[4.8rem] text-4xl'/>
						</InputOTPGroup>
					</InputOTP>
				</div>
			</DialogContent>
		</Dialog>
	);
}
