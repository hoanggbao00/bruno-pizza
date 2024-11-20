'use client';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import BuildNowForm from './build-now-form';

export default function BuildNow() {
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
				<div className='max-h-[80vh] overflow-auto px-1'>
					<BuildNowForm />
				</div>
				<DialogFooter>
					<Button
						className='bg-brand hover:bg-brand/90 text-white'
						type='submit'
						form='pizza-form'
					>
						Start Build
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
