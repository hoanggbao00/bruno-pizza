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
import { useEffect, useState } from 'react';
import { useConfirm } from '@/lib/stores/use-confirm';
import { toast } from 'sonner';
import { ITopping } from '@/types/topping';
import ToppingDialog from './_components/topping-dialog';
import { deleteTopping, getToppings } from '@/lib/actions/topping.action';

export default function ToppingsPage() {
	const [topping, setTopping] = useState<ITopping | null>(null);
	const [listTopping, setListTopping] = useState<ITopping[]>([]);
	const [open, setOpen] = useState(false);
	const { confirm } = useConfirm();

	const fetchToppings = async () => {
		try {
			const res = await getToppings();
			setListTopping(res);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!');
		}
	};

	const handleClose = (value: boolean) => {
		if (topping) setTopping(null);
		setOpen(value);
	};

	const handleDelete = async (item: ITopping) => {
		await confirm.danger(
			`Are you sure to delete ${item.name}?`,
			async () => {
				try {
					await deleteTopping(item.$id);

					toast.success(`Deleted ${item.name}`);
					setListTopping((prev) => prev.filter((c) => c.$id !== item.$id));
				} catch (error) {
					console.log(error);
					toast.error('Something went wrong!');
				}
			}
		);
	};

	useEffect(() => {
		fetchToppings();
	}, []);

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Toppings</h1>
				<ToppingDialog
					handleClose={handleClose}
					isOpen={open}
					topping={topping}
					setListTopping={setListTopping}
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
					{listTopping.map((topping, index) => (
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
