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
import { EPizzaStockStatus, IPizza } from '@/types/pizza';
import { currency, DEFAULT_IMAGE } from '@/shared/constants';
import { Edit, Trash } from 'lucide-react';
import StockRender from '@/components/stock-render';
import PizzaDialog from './_components/pizza-dialog';
import { useState } from 'react';
import { useConfirm } from '@/lib/stores/use-confirm';
import { toast } from 'sonner';

// Mock data (replace with actual data fetching in a real application)
const pizzas: IPizza[] = [
	{
		$id: '1',
		name: 'Margherita',
		category: { $id: '1', name: 'Classic', slug: 'classic' },
		price: 150000,
		images: [DEFAULT_IMAGE],
		toppings: [],
		sizes: [],
		stockStatus: EPizzaStockStatus.IN_STOCK,
		currentStockQuantity: 50,
		isBestSeller: true,
		isAvailable: true,
		$createdAt: '2023-01-01',
		$updatedAt: '2023-01-01',
	},
	{
		$id: '2',
		name: 'Margherita',
		category: { $id: '1', name: 'Classic', slug: 'classic' },
		price: 150000,
		images: [DEFAULT_IMAGE],
		toppings: [],
		sizes: [],
		stockStatus: EPizzaStockStatus.IN_STOCK,
		currentStockQuantity: 50,
		isBestSeller: true,
		isAvailable: true,
		$createdAt: '2023-01-01',
		$updatedAt: '2023-01-01',
	},
];

export default function PizzasPage() {
	const [pizza, setPizza] = useState<IPizza | null>(null);
	const [open, setOpen] = useState(false);
	const { confirm } = useConfirm();

	const handleClose = (value: boolean) => {
		if (pizza) setPizza(null);
		setOpen(value);
	};

	const handleDelete = async (item: IPizza) => {
		await confirm.danger(
			`Bạn có chắc chắn muốn xóa ${item.name}?`,
			async () => {
				try {
					console.log(item);

					toast.success(`Đã xóa danh mục ${item.name}`);
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
				<h1 className='text-3xl font-bold'>Pizzas</h1>
				<PizzaDialog handleClose={handleClose} isOpen={open} pizza={pizza} />
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
						<TableHead className='text-center font-semibold'>
							Category
						</TableHead>
						<TableHead className='text-center font-semibold'>Price</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							Stock Status
						</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							Action
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{pizzas.map((pizza, index) => (
						<TableRow key={pizza.$id}>
							<TableCell className='text-center'>{index + 1}</TableCell>
							<TableCell>
								<div>
									<img
										src={pizza.images[0]}
										alt={pizza.name}
										className='size-16 object-cover rounded-md block mx-auto'
									/>
								</div>
							</TableCell>
							<TableCell className='text-center'>{pizza.name}</TableCell>
							<TableCell className='text-center'>
								{pizza.category.name}
							</TableCell>
							<TableCell className='text-right'>
								{pizza.price.toLocaleString()} {currency}
							</TableCell>
							<TableCell className='text-center'>
								<div>
									<StockRender stock={pizza.stockStatus} />
								</div>
							</TableCell>
							<TableCell>
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										className='bg-yellow-400/50 hover:bg-yellow-500'
										onClick={() => setPizza(pizza)}
									>
										<Edit className='h-4 w-4' />
									</Button>
									<Button
										variant='outline'
										size='icon'
										className='bg-rose-400/50 hover:bg-rose-500'
										onClick={() => handleDelete(pizza)}
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