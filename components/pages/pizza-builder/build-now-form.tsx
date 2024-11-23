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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from '@/components/ui/multi-select';

const formSchema = z.object({
	name: z.string(),
	description: z.string(),
	size: z.string(),
	toppings: z.array(z.string()).nonempty('Please at least one item'),
});

export default function BuildNowForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			toppings: ['React'],
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
				className='space-y-6'
				id='pizza-form'
			>
				<div className='w-full aspect-video border border-dashed flex-center p-1 rounded-md'>
					Your Pizza you want will generate here
					{/* <div className='w-full h-full relative'>
						<img
							src='/assets/images/photo-1628840042765-356cda07504e.png'
							alt='Pizza-builder'
							className='absolute size-full object-cover rounded-md'
						/>
					</div> */}
				</div>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Pizza Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Put your name you want to'
									type=''
									{...field}
								/>
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
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Description about your pizza'
									className='resize-none'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='size'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Size</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='What size of your pizza?' />
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
					name='toppings'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select your ingredients (max 5)</FormLabel>
							<FormControl>
								<MultiSelector
									values={field.value}
									onValuesChange={field.onChange}
									loop
									className='max-w-xs'
								>
									<MultiSelectorTrigger label={['React', 'Vue', 'Svelte']}>
										<MultiSelectorInput placeholder='Select your ingredients' />
									</MultiSelectorTrigger>
									<MultiSelectorContent>
										<MultiSelectorList className='!bg-white'>
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

							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
