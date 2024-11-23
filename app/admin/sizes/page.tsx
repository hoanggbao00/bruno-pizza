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
import { currency } from '@/shared/constants';
import { Edit, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useConfirm } from '@/lib/stores/use-confirm';
import { toast } from 'sonner';
import SizeDialog from './_components/size-dialog';
import { IPizzaSize } from '@/types/size';
import { deletePizzaSize, getPizzaSizes } from '@/lib/actions/size.action';

export default function Page() {
	const [size, setSize] = useState<IPizzaSize | null>(null);
	const [listSize, setListSize] = useState<IPizzaSize[]>([]);
	const [open, setOpen] = useState(false);
	const { confirm } = useConfirm();

	const fetchSize = async () => {
		try {
			const res = await getPizzaSizes();
			setListSize(res);
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi lấy dữ liệu kích thước!');
		}
	};

	const handleClose = (value: boolean) => {
		if (size) setSize(null);
		setOpen(value);
	};

	const handleDelete = async (item: IPizzaSize) => {
		await confirm.danger(
			`Bạn có chắc chắn muốn xóa kích thước ${item.name}?`,
			async () => {
				try {
					await deletePizzaSize(item.$id);

					toast.success(`Đã xóa ${item.name}`);
					setListSize((prev) => prev.filter((c) => c.$id !== item.$id));
				} catch (error) {
					console.log(error);
					toast.error('Có lỗi xảy ra khi xóa!');
				}
			}
		);
	};

	useEffect(() => {
		fetchSize();
	}, []);

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Size</h1>
				<SizeDialog handleClose={handleClose} isOpen={open} size={size} setList={setListSize}/>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center font-semibold w-[50px]'>
							#
						</TableHead>
						<TableHead className='text-center font-semibold'>Kích thước</TableHead>
						<TableHead className='text-center font-semibold'>Giá</TableHead>
						<TableHead className='text-center font-semibold w-[150px]'>
							Hành động
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{listSize.map((item, index) => (
						<TableRow key={item.$id}>
							<TableCell className='text-center'>{index + 1}</TableCell>
							<TableCell className='text-center'>{item.name}</TableCell>
							<TableCell className='text-center'>
								{item.price.toLocaleString()} {currency}
							</TableCell>
							<TableCell>
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										className='bg-yellow-400/50 hover:bg-yellow-500'
										onClick={() => setSize(item)}
									>
										<Edit className='h-4 w-4' />
									</Button>
									<Button
										variant='outline'
										size='icon'
										className='bg-rose-400/50 hover:bg-rose-500'
										onClick={() => handleDelete(item)}
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
