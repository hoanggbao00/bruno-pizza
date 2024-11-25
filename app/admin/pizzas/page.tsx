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
import { Edit, Loader2, Trash } from 'lucide-react';
import StockRender from '@/components/stock-render';
import PizzaDialog from './_components/pizza-dialog';
import { useEffect, useState } from 'react';
import { useConfirm } from '@/lib/stores/use-confirm';
import { toast } from 'sonner';
import {
	deletePizza,
	getPizzas,
	updatePizza,
} from '@/lib/actions/pizza.action';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function PizzasPage() {
	const [pizza, setPizza] = useState<IPizza | null>(null);
	const [listPizza, setListPizza] = useState<IPizza[]>([]);
	const [open, setOpen] = useState(false);
	const { confirm } = useConfirm();
	const [loading, setLoading] = useState(false);

	const fetchPizza = async () => {
		try {
			const res = await getPizzas();
			setListPizza(res);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!');
		}
	};

	const handleClose = (value: boolean) => {
		if (pizza) setPizza(null);
		setOpen(value);
	};

	const handleDelete = async (item: IPizza) => {
		await confirm.danger(
			`Are you sure to delete ${item.name}?`,
			async () => {
				try {
					await deletePizza(item.$id);
					setListPizza((prev) => prev.filter((c) => c.$id !== item.$id));

					toast.success(`${item.name} deleted`);
				} catch (error) {
					console.log(error);
					toast.error('Something went wrong!');
				}
			}
		);
	};

	const handleUpdateStatus = async (
		itemId: string,
		status: EPizzaStockStatus
	) => {
		setLoading(true)
		try {
			await updatePizza(itemId, { stockStatus: status });
			toast.success('Status Updated');
			setListPizza((prev) =>
				prev.map((item) =>
					item.$id === itemId ? { ...item, stockStatus: status } : item
				)
			);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!');
		} finally {
			setLoading(false)
		}
	};

	useEffect(() => {
		fetchPizza();
	}, []);

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Pizzas</h1>
				<PizzaDialog
					handleClose={handleClose}
					isOpen={open}
					pizza={pizza}
					setList={setListPizza}
				/>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center font-semibold w-[50px]'>
							#
						</TableHead>
						<TableHead className='text-center font-semibold w-24'>
							Image
						</TableHead>
						<TableHead className='text-center font-semibold'>Name</TableHead>
						<TableHead className='text-center font-semibold'>
							Category
						</TableHead>
						<TableHead className='text-center font-semibold'>Price</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							{loading && (
								<Loader2 size={16} className='inline-block animate-spin mr-2' />
							)}
							Status
						</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							Action
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{listPizza.map((pizza, index) => (
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
								{pizza.category?.name}
							</TableCell>
							<TableCell className='text-right'>
								{pizza.price.toLocaleString()} {currency}
							</TableCell>
							<TableCell className='text-center'>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<StockRender stock={pizza.stockStatus} />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(
													pizza.$id,
													EPizzaStockStatus.DISCONTINUED
												)
											}
										>
											<StockRender stock={EPizzaStockStatus.DISCONTINUED} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(
													pizza.$id,
													EPizzaStockStatus.IN_STOCK
												)
											}
										>
											<StockRender stock={EPizzaStockStatus.IN_STOCK} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(
													pizza.$id,
													EPizzaStockStatus.LOW_STOCK
												)
											}
										>
											<StockRender stock={EPizzaStockStatus.LOW_STOCK} />
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												handleUpdateStatus(
													pizza.$id,
													EPizzaStockStatus.OUT_OF_STOCK
												)
											}
										>
											<StockRender stock={EPizzaStockStatus.OUT_OF_STOCK} />
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
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
