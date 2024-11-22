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
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from '@/components/ui/file-upload';
import { EToppingType, ITopping } from '@/types/topping';

const formSchema = z.object({
	image: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
	type: z
		.enum([EToppingType.NORMAL, EToppingType.CUSTOM])
		.default(EToppingType.NORMAL),
});

interface Props {
	topping: ITopping | null;
}

export default function ToppingForm({ topping }: Props) {
	const [files, setFiles] = useState<File[] | null>(null);

	const dropZoneConfig = {
		maxFiles: 5,
		maxSize: 1024 * 1024 * 4,
		multiple: true,
	};
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			image: topping?.image || '',
			name: topping?.name || '',
			description: topping?.description || '',
			price: topping?.price || 0,
			type: topping?.type || EToppingType.NORMAL,
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
					name='image'
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
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Danh mục Topping</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Nhấn để chọn' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={EToppingType.NORMAL}>
										Pizza bình thường
									</SelectItem>
									<SelectItem value={EToppingType.CUSTOM}>
										Pizza Custom
									</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên Topping</FormLabel>
							<FormControl>
								<Input placeholder='Nhập tên Topping' type='text' {...field} />
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
							<FormLabel>Thông tin thêm</FormLabel>
							<FormControl>
								<Textarea placeholder='' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>
								Bạn có thể viết thông tin thêm về Topping này hoặc bỏ qua nó
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
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
