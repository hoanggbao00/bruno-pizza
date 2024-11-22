'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { CloudUpload, Paperclip } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from '@/components/ui/multi-select';
import {
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from '@/components/ui/file-upload';
import { IPizzaSize } from '@/types/size';
import { ITopping } from '@/types/topping';
import { ICategory } from '@/types/category';
import { getPizzaSizes } from '@/lib/actions/size.action';
import { getToppings } from '@/lib/actions/topping.action';
import { getCategories } from '@/lib/actions/category.action';
import { IPizza } from '@/types/pizza';

const formSchema = z.object({
	images: z.string(),
	name: z.string(),
	category: z.string(),
	description: z.string().optional(),
	price: z.number(),
	sizes: z.array(z.string()).nonempty('Please at least one item'),
	toppings: z.array(z.string()).nonempty('Please at least one item'),
});

interface PizzaFormProps {
	pizza: IPizza | null;
}

export default function PizzaForm({ pizza }: PizzaFormProps) {
	const [files, setFiles] = useState<File[] | null>(null);
	const [sizes, setSizes] = useState<IPizzaSize[]>([]);
	const [toppings, setToppings] = useState<ITopping[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);

	const fetchInitialData = async () => {
		try {
			const sizeData = await getPizzaSizes();
			setSizes(sizeData);

			const toppingData = await getToppings();
			setToppings(toppingData);

			const categoryData = await getCategories();
			setCategories(categoryData);
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi lấy dữ liệu Form!');
		}
	};

	const dropZoneConfig = {
		maxFiles: 5,
		maxSize: 1024 * 1024 * 4,
		multiple: true,
	};
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: pizza?.images[0] || '',
			name: pizza?.name || '',
			category: pizza?.category.$id || '',
			description: pizza?.description || '',
			price: pizza?.price || 0,
			sizes: pizza?.sizes.map((size) => size.$id) || [],
			toppings: pizza?.toppings.map((topping) => topping.$id) || [],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			console.log(values);
			toast(
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(values, null, 2)}</code>
				</pre>
			);
		} catch (error) {
			console.error('Form submission error', error);
			toast.error('Failed to submit the form. Please try again.');
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 max-w-3xl mx-auto py-10 max-h-[80vh] overflow-auto px-2'
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
										<div className='flex items-center justify-center flex-col p-8 w-full '>
											<CloudUpload className='text-gray-500 w-10 h-10' />
											<p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
												<span className='font-semibold'>Click to upload</span>
												&nbsp; or drag and drop
											</p>
											<p className='text-xs text-gray-500 dark:text-gray-400'>
												SVG, PNG, JPG or GIF
											</p>
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
							<FormDescription>Tải ảnh lên</FormDescription>
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
								<Input placeholder='Nhập tên pizza' type='text' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Danh mục</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Nhấn để chọn' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='m@example.com'>m@example.com</SelectItem>
									<SelectItem value='m@google.com'>m@google.com</SelectItem>
									<SelectItem value='m@support.com'>m@support.com</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thông tin thêm</FormLabel>
							<FormControl>
								<Textarea placeholder='' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>
								Bạn có thể viết thông tin thêm về pizza này hoặc bỏ qua nó
							</FormDescription>
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
								<Input placeholder='Nhập giá' type='number' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='sizes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kích thước</FormLabel>
							<FormControl>
								<MultiSelector
									values={field.value}
									onValuesChange={field.onChange}
									loop
								>
									<MultiSelectorTrigger>
										<MultiSelectorInput placeholder='Select languages' />
									</MultiSelectorTrigger>
									<MultiSelectorContent>
										<MultiSelectorList>
											<MultiSelectorItem value={'React'}>
												React
											</MultiSelectorItem>
											<MultiSelectorItem value={'Vue'}>Vue</MultiSelectorItem>
											<MultiSelectorItem value={'Svelte'}>
												Svelte
											</MultiSelectorItem>
										</MultiSelectorList>
									</MultiSelectorContent>
								</MultiSelector>
							</FormControl>
							<FormDescription>
								Chọn các kích thước của Pizza. (Tối da 3)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='toppings'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dạng đế</FormLabel>
							<FormControl>
								<MultiSelector
									values={field.value}
									onValuesChange={field.onChange}
									loop
								>
									<MultiSelectorTrigger>
										<MultiSelectorInput placeholder='Select languages' />
									</MultiSelectorTrigger>
									<MultiSelectorContent>
										<MultiSelectorList>
											<MultiSelectorItem value={'React'}>
												React
											</MultiSelectorItem>
											<MultiSelectorItem value={'Vue'}>Vue</MultiSelectorItem>
											<MultiSelectorItem value={'Svelte'}>
												Svelte
											</MultiSelectorItem>
										</MultiSelectorList>
									</MultiSelectorContent>
								</MultiSelector>
							</FormControl>
							<FormDescription>Chọn các loại đế của Pizza</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
