'use client';
import { useEffect, useState } from 'react';
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
import { CloudUpload, Loader2, Paperclip } from 'lucide-react';

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
import { EToppingType, ITopping } from '@/types/topping';
import { ICategory } from '@/types/category';
import { getPizzaSizes } from '@/lib/actions/size.action';
import { getToppings } from '@/lib/actions/topping.action';
import { getCategories } from '@/lib/actions/category.action';
import { IPizza } from '@/types/pizza';
import { uploadImage } from '@/lib/actions/upload.action';
import { createPizza, updatePizza } from '@/lib/actions/pizza.action';

const formSchema = z.object({
	images: z.string(),
	name: z.string(),
	category: z.string().min(1, 'Please fill this field'),
	description: z.string().optional(),
	price: z.number(),
	sizes: z.array(z.string()).nonempty('Please pick at least 1 item'),
	toppings: z.array(z.string()).nonempty('Please pick at least 1 item'),
});

interface PizzaFormProps {
	pizza: IPizza | null;
	handleClose: (open: boolean) => void;
	setList: React.Dispatch<React.SetStateAction<IPizza[]>>;
}

export default function PizzaForm({
	pizza,
	handleClose,
	setList,
}: PizzaFormProps) {
	const [files, setFiles] = useState<File[] | null>(null);
	const [sizes, setSizes] = useState<IPizzaSize[]>([]);
	const [toppings, setToppings] = useState<ITopping[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState(pizza?.images[0] || '');

	const fetchInitialData = async () => {
		try {
			const sizeData = await getPizzaSizes();
			setSizes(sizeData);

			const toppingData = await getToppings(EToppingType.NORMAL);
			setToppings(toppingData);

			const categoryData = await getCategories();
			setCategories(categoryData);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!');
		}
	};

	const dropZoneConfig = {
		maxFiles: 1,
		maxSize: 1024 * 1024 * 4,
		multiple: false,
		accept: {
			'image/*': ['.jpg', '.jpeg', '.png'],
		},
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

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		let imgUrl = '';
		try {
			if (pizza) {
				if (values.category === pizza.category.$id) {
					//@ts-expect-error refactor
					values.category = { ...pizza.category };
				}

				// Topping
				if (
					!values.toppings.every(
						(topping, index) => topping === pizza.toppings[index].$id
					)
				) {
					const newTopping = toppings.filter((topping) =>
						values.toppings.includes(topping.$id)
					);
					//@ts-expect-error refactor
					values.toppings = newTopping.map((topping) => ({
						$id: topping.$id,
						name: topping.name,
					}));
				}

				// Size
				if (
					!values.sizes.every((size, index) => size === pizza.sizes[index].$id)
				) {
					const newSize = sizes.filter((size) =>
						values.sizes.includes(size.$id)
					);
					//@ts-expect-error refactor
					values.sizes = newSize.map((size) => ({
						$id: size.$id,
						name: size.name,
					}));
				}

				//@ts-expect-error refactor
				const res = await updatePizza(pizza.$id, values);
				setList((prev) =>
					prev.map((item) => (item.$id === pizza?.$id ? res : item))
				);
			} else {
				if (!files || files.length === 0)
					return toast.error('Upload an image');
				
				const imageUrl = await uploadImage(files![0]);
				//@ts-expect-error refactor
				values.images = [imageUrl];
				imgUrl = imageUrl;

				// Category
				const category = categories.find((c) => c.$id === values.category);
				//@ts-expect-error refactor
				values.category = { $id: category?.$id, name: category?.name };

				// Toppings
				const newTopping = toppings.filter((topping) =>
					values.toppings.includes(topping.$id)
				);
				//@ts-expect-error refactor
				values.toppings = newTopping.map((topping) => ({
					$id: topping.$id,
					name: topping.name,
				}));

				// Sizes
				const newSize = sizes.filter((size) => values.sizes.includes(size.$id));
				//@ts-expect-error refactor
				values.sizes = newSize.map((size) => ({
					$id: size.$id,
					name: size.name,
				}));

				//@ts-expect-error refactor
				const res = await createPizza(values);
				setList((prev) => [...prev, res]);
			}
			toast.success(`${pizza ? 'Update' : 'Create'} pizza successfully!`);
			handleClose(false);
		} catch (error) {
			console.error('Form submission error', error);
			toast.error(
				`Something went wrong when ${pizza ? 'update' : 'create'} pizza!`
			);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (files && files.length > 0) setImage(URL.createObjectURL(files[0]));
	}, [files]);

	useEffect(() => {
		fetchInitialData();
	}, []);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-2 max-w-3xl mx-auto py-6 max-h-[80vh] overflow-auto px-2'
			>
				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
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
													<span className='font-semibold'>Click to upload</span>
													&nbsp; or drag and drop
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
							<FormDescription>Upload</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='Enter pizza name' type='text' {...field} />
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
							<FormLabel>Category</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Pick one' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category.$id} value={category.$id}>
											{category.name}
										</SelectItem>
									))}
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
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder='' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>
								You can skip this field if you don&apos;t want
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
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter price'
									type='number'
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
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
							<FormLabel>Size</FormLabel>
							<FormControl>
								<MultiSelector
									values={field.value}
									onValuesChange={field.onChange}
									loop
								>
									<MultiSelectorTrigger
										label={sizes.map((size) => ({
											value: size.$id,
											label: size.name,
										}))}
									>
										<MultiSelectorInput placeholder='Pick many' />
									</MultiSelectorTrigger>
									<MultiSelectorContent>
										<MultiSelectorList>
											{sizes.map((size) => (
												<MultiSelectorItem key={size.$id} value={size.$id}>
													{size.name}
												</MultiSelectorItem>
											))}
										</MultiSelectorList>
									</MultiSelectorContent>
								</MultiSelector>
							</FormControl>
							<FormDescription>
								Pick size of Pizza (max: 3)
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
							<FormLabel>Pizza Base</FormLabel>
							<FormControl>
								<MultiSelector
									values={field.value}
									onValuesChange={field.onChange}
									loop
								>
									<MultiSelectorTrigger
										label={toppings.map((topping) => ({
											value: topping.$id,
											label: topping.name,
										}))}
									>
										<MultiSelectorInput placeholder='Pick one or many' />
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
							<FormDescription>Pick some pizza base</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-end'>
					<Button type='submit' disabled={isLoading}>
						{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						{pizza ? 'Save' : 'Create'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
