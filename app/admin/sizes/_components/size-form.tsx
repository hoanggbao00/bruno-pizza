'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { IPizzaSize } from '@/types/size';
import { createPizzaSize, updatePizzaSize } from '@/lib/actions/size.action';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập tên kích thước'),
	price: z.number(),
});

interface Props {
	size: IPizzaSize | null;
	setList: React.Dispatch<React.SetStateAction<IPizzaSize[]>>;
	handleClose: (value: boolean) => void;
}

export default function SizeForm({ size, setList, handleClose }: Props) {
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: size?.name || '',
			price: size?.price || 0,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			if (size) {
				await updatePizzaSize(size.$id, values);
				setList((prev) =>
					prev.map((item) =>
						item.$id === size.$id ? { $id: item.$id, ...values } : item
					)
				);
				handleClose(false);
			} else {
				const res = await createPizzaSize(values);
				setList((prev) => [...prev, { $id: res.$id, ...values }]);
				handleClose(false);
			}
			toast.success(`${size ? 'Cập nhật' : 'Thêm'} ${values.name} thành công!`);
		} catch (error) {
			console.error('Form submission error', error);
			toast.error(
				`Có lỗi xảy ra khi ${size ? 'cập nhật' : 'thêm mới'} kích thước!`
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 max-w-3xl mx-auto py-4 max-h-[80vh] overflow-auto px-2'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên kích thước</FormLabel>
							<FormControl>
								<Input
									placeholder='Nhập tên kích thước'
									type='text'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Đơn giá</FormLabel>
							<FormControl>
								<Input
									placeholder='Nhập giá'
									type='number'
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={loading}>
					{loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					{size ? 'Cập nhật' : 'Thêm'}
				</Button>
			</form>
		</Form>
	);
}
