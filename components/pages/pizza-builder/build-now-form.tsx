'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from '@/components/ui/multi-select';
import { useEffect, useState } from 'react';
import { EToppingType, ITopping } from '@/types/topping';
import { getToppings } from '@/lib/actions/topping.action';
import {
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from '@/components/ui/file-upload';
import { CloudUpload, Loader2, Paperclip } from 'lucide-react';
import QRDialog from '../cart/qr-dialog';
import { createCustomPizza } from '@/lib/actions/pizza.action';
import { uploadImage } from '@/lib/actions/upload.action';
import { useHistoryOrder } from '@/lib/stores/use-history-order';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/stores/use-auth-store';
import { currency, DEFAULT_CUSTOM_PRICE } from '@/shared/constants';

const formSchema = z.object({
	name: z.string({ message: 'Vui lòng nhập tên Pizza' }),
	description: z.string({ message: 'Vui lòng nhập mô tả' }),
	toppings: z
		.array(z.string({ message: 'Vui lòng chọn nguyên liệu' }))
		.nonempty('Vui lòng chọn ít nhất 1 loại nguyên liệu'),
	images: z.string().optional(),
});

export default function BuildNowForm() {
	const [toppings, setToppings] = useState<ITopping[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File[] | null>(null);
	const [image, setImage] = useState('');
	const [qrCode, setQrCode] = useState({
		cartId: '',
		price: 0,
	});
	const { ids, setIds } = useHistoryOrder();
	const { user } = useAuthStore();

	const fetchInitialData = async () => {
		try {
			const toppingData = await getToppings(EToppingType.CUSTOM);
			setToppings(toppingData);
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi lấy dữ liệu Topping!');
		}
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			toppings: [],
			images: '',
		},
	});

	const dropZoneConfig = {
		maxFiles: 1,
		maxSize: 1024 * 1024 * 4,
		multiple: false,
		accept: {
			'image/*': ['.jpg', '.jpeg', '.png'],
		},
	};

	const finalPrice = form.watch('toppings').reduce((acc, cur) => {
		const topping = toppings.find((topping) => topping.$id === cur);
		return acc + (topping?.price || 0);
	}, DEFAULT_CUSTOM_PRICE);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (files && files.length === 0)
			return toast.error('Vui lý chọn tải lên ít nhất 1 ảnh');
		setIsLoading(true);
		try {
			const newToppings = toppings.filter((topping) =>
				values.toppings.includes(topping.$id)
			);

			if (files && files.length > 0) {
				const img = await uploadImage(files[0]);
				values.images = img;
			}

			const { $id, price } = await createCustomPizza(
				{
					...values,
					toppings: newToppings,
					images: [values.images!],
				},
				user!
			);

			toast.success('Đã tạo Pizza của bạn, vui lòng thanh toán!');
			setIds([...ids, $id]);
			setQrCode({ cartId: $id, price });
		} catch (error) {
			console.error('Form submission error', error);
			toast.error('Failed to submit the form. Please try again.');
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchInitialData();
	}, []);

	useEffect(() => {
		if (files && files.length > 0) setImage(URL.createObjectURL(files[0]));
		else setImage('');
	}, [files]);

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
					id='pizza-form'
				>
					<FormField
						control={form.control}
						name='images'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ảnh</FormLabel>
								<FormControl>
									<FileUploader
										value={files}
										onValueChange={setFiles}
										dropzoneOptions={dropZoneConfig}
										className='relative bg-background rounded-lg p-2'
									>
										<FileInput
											id='fileInput'
											className='outline-dashed outline-1 outline-slate-500'
										>
											<div className='flex items-center justify-center flex-col p-8 w-full relative'>
												<div
													className={`${
														files && files.length
															? 'opacity-0'
															: 'flex items-center justify-center flex-col p-8 w-full'
													}`}
												>
													<CloudUpload className='text-gray-500 w-10 h-10' />
													<p className='mb-1 text-sm text-gray-500 dark:tnt-sgray-400'>
														<span className='font-semibold'>Tải ảnh lên</span>
														&nbsp;hoặc kéo thả vào đây
													</p>
													<p className='text-xs text-gray-500 dark:text-gray-400'>
														SVG, PNG, JPG or GIF
													</p>
												</div>
												{image && (
													<img
														src={image}
														alt={field.name}
														className='absolute size-full object-contain'
													/>
												)}
											</div>
										</FileInput>
										<FileUploaderContent>
											{files &&
												files.length > 0 &&
												files.map((file, i) => (
													<FileUploaderItem key={i} index={i}>
														<Paperclip className='h-4 w-4 stroke-current' />
														<span>{file.name}</span>
													</FileUploaderItem>
												))}
										</FileUploaderContent>
									</FileUploader>
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
								<FormLabel>Tên Pizza</FormLabel>
								<FormControl>
									<Input type='' {...field} />
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
								<FormLabel>Mô tả </FormLabel>
								<FormControl>
									<Textarea className='resize-none' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{toppings.length > 0 && (
						<FormField
							control={form.control}
							name='toppings'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Chọn nguyên liệu của bạn (tối đa 5)</FormLabel>
									<FormControl>
										<MultiSelector
											values={field.value}
											onValuesChange={(value) => {
												if (value.length > 5) {
													toast.error('Tối đã 5 Topping');
												} else {
													field.onChange(value);
												}
											}}
											loop
										>
											<MultiSelectorTrigger
												label={toppings.map((t) => ({
													value: t.$id,
													label: t.name,
												}))}
											>
												<MultiSelectorInput placeholder='Chọn các Topping của bạn' />
											</MultiSelectorTrigger>
											<MultiSelectorContent>
												<MultiSelectorList>
													{toppings.map((topping) => (
														<MultiSelectorItem
															key={topping.$id}
															value={topping.$id}
														>
															{topping.name}
														</MultiSelectorItem>
													))}
												</MultiSelectorList>
											</MultiSelectorContent>
										</MultiSelector>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<div className='flex justify-between'>
						<p>Thành tiền:</p>
						<p className='text-right font-semibold text-brand-100 text-2xl'>
							{finalPrice.toLocaleString()} {currency}
						</p>
					</div>
					<div className='flex justify-end'>
						<Button className='bg-green hover:bg-green/80' disabled={isLoading}>
							{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							Thanh toán
						</Button>
					</div>
				</form>
			</Form>
			{qrCode.cartId && <QRDialog qrCode={qrCode} setQrCode={setQrCode} />}
		</>
	);
}
