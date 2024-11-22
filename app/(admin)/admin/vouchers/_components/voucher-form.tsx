'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { EVoucherType, IVoucher } from '@/types/voucher';
import { createVoucher, updateVoucher } from '@/lib/actions/voucher.action';
import { useState } from 'react';

const formSchema = z
	.object({
		code: z.string().min(1, 'Vui lòng nhập mã Voucher'),
		name: z.string().min(1, 'Vui lòng nhập tên voucher'),
		description: z.string().optional(),
		value: z.number().min(1, 'Vui lòng nhập giá trị lớn hơn 1'),
		type: z.enum([EVoucherType.PERCENTAGE, EVoucherType.FIXED_AMOUNT]),
		startDate: z.coerce.date(),
		endDate: z.coerce.date(),
		maxUsageCount: z.number().min(1, 'Vui lần nhập số lần sử dụng lớn hơn 1'),
	})
	.refine((data) => data.endDate > data.startDate, {
		message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
		path: ['endDate'],
	});

interface Props {
	voucher: IVoucher | null;
	handleClose: (value: boolean) => void;
	setListVoucher: React.Dispatch<React.SetStateAction<IVoucher[]>>;
}

export default function VoucherForm({
	voucher,
	handleClose,
	setListVoucher,
}: Props) {
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: voucher?.name || '',
			code: voucher?.code || '',
			description: voucher?.description || '',
			type: voucher?.type || EVoucherType.PERCENTAGE,
			value: voucher?.value || 0,
			startDate: voucher?.startDate || new Date(),
			endDate: voucher?.endDate || new Date(),
			maxUsageCount: voucher?.maxUsageCount || 0,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			if (voucher) {
				await updateVoucher(voucher.$id, values);
				setListVoucher((prev) =>
					prev.map((item) => {
						if (item.$id === voucher.$id) {
							return {
								...item,
								...values,
							};
						}
						return item;
					})
				);
			} else {
				const newItem: Omit<IVoucher, '$id' | '$createdAt' | '$updatedAt'> = {
					...values,
					isActive: true,
					currentUsageCount: 0,
					description: values.description || null,
				};

				const res = await createVoucher(newItem);
				setListVoucher((prev) => [...prev, { $id: res.$id, ...newItem }]);
			}
			toast.success(`${voucher ? 'Cập nhật' : 'Thêm'} voucher thành công!`);
			handleClose(false);
		} catch (error) {
			console.error('Form submission error', error);
			toast.error(
				`Có lỗi xảy ra khi ${voucher ? 'cập nhật' : 'thêm mới'} voucher!`
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 mx-auto py-4 max-h-[80vh] overflow-auto px-2'
			>
				<FormField
					control={form.control}
					name='code'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mã Voucher</FormLabel>
							<FormControl>
								<Input placeholder='Nhập mã voucher' type='text' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên voucher</FormLabel>
							<FormControl>
								<Input placeholder='Tên voucher' type='text' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chi tiết</FormLabel>
							<FormControl>
								<Textarea placeholder='' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>
								Nhập chi tiết về voucher này (có thể bỏ trống)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-8'>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá trị</FormLabel>
									<FormControl>
										<Input
											placeholder=''
											type='number'
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='col-span-4'>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dạng áp dụng</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={EVoucherType.PERCENTAGE}>%</SelectItem>
											<SelectItem value={EVoucherType.FIXED_AMOUNT}>
												VND
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>% hoặc VND</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-6'>
						<FormField
							control={form.control}
							name='startDate'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Ngày bắt đầu</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'dd/MM/yyyy')
													) : (
														<span>Chọn ngày</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='col-span-6'>
						<FormField
							control={form.control}
							name='endDate'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Ngày kết thúc</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'dd/MM/yyyy')
													) : (
														<span>Chọn ngày</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<FormField
					control={form.control}
					name='maxUsageCount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Số lượng dùng tối đa</FormLabel>
							<FormControl>
								<Input
									placeholder=''
									type='number'
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormDescription>
								Cài đặt số lần dùng tối đa của voucher này
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={loading}>
					{loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					{voucher ? 'Cập nhật' : 'Thêm mới'}
				</Button>
			</form>
		</Form>
	);
}
