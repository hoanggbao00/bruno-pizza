'use client';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { currency, DEFAULT_IMAGE } from '@/shared/constants';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { useConfirm } from '@/lib/stores/use-confirm';
import { toast } from 'sonner';
import { EToppingType, ITopping } from '@/types/topping';
import ToppingDialog from './_components/topping-dialog';

// Mock data (replace with actual data fetching in a real application)
const initialToppings: ITopping[] = [
	{
		$id: '1',
		name: 'Mushrooms',
		image: null,
		description: 'Fresh sliced mushrooms',
		price: 15000,
		type: EToppingType.NORMAL,
	},
	{
		$id: '2',
		name: 'Extra Cheese',
		image: null,
		description: 'Blend of mozzarella and cheddar',
		price: 30000,
		type: EToppingType.NORMAL,
	},
	{
		$id: '3',
		name: 'Custom Sauce',
		image: null,
		description: 'Your choice of sauce',
		price: 20000,
		type: EToppingType.CUSTOM,
	},
];

export default function ToppingsPage() {
	const [topping, setTopping] = useState<ITopping | null>(null);
	const [open, setOpen] = useState(false);
	const { confirm } = useConfirm();

	const handleClose = (value: boolean) => {
		if (topping) setTopping(null);
		setOpen(value);
	};

	const handleDelete = async (item: ITopping) => {
		await confirm.danger(
			`Bạn có chắc chắn muốn xóa ${item.name}?`,
			async () => {
				try {
					console.log(item);

					toast.success(`Đã xóa topping ${item.name}`);
				} catch (error) {
					console.log(error);
					toast.error('Có lỗi xảy ra khi xóa!');
				}
			}
		);
	};

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Toppings</h1>
				<ToppingDialog
					handleClose={handleClose}
					isOpen={open}
					topping={topping}
				/>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center font-semibold w-[50px]'>
							#
						</TableHead>
						<TableHead className='text-center font-semibold w-24'>
							Ảnh
						</TableHead>
						<TableHead className='text-center font-semibold'>Name</TableHead>
						<TableHead className='text-center font-semibold'>Price</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{initialToppings.map((topping, index) => (
						<TableRow key={topping.$id}>
							<TableCell className='text-center'>{index + 1}</TableCell>
							<TableCell>
								<div>
									<img
										src={topping.image || DEFAULT_IMAGE}
										alt={topping.name}
										className='size-16 object-cover rounded-md block mx-auto'
									/>
								</div>
							</TableCell>
							<TableCell className='text-center'>{topping.name}</TableCell>
							<TableCell className='text-center'>
								{topping.price.toLocaleString()} {currency}
							</TableCell>
							<TableCell>
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										className='bg-yellow-400/50 hover:bg-yellow-500'
										onClick={() => setTopping(topping)}
									>
										<Edit className='h-4 w-4' />
									</Button>
									<Button
										variant='outline'
										size='icon'
										className='bg-rose-400/50 hover:bg-rose-500'
										onClick={() => handleDelete(topping)}
									>
										<Trash className='h-4 w-4' />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
