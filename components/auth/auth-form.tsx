'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'nextjs-toploader/app';
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
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { login, signUp } from '@/lib/actions/user.actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/use-auth-store';

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (formType: FormType) => {
	return z.object({
		email: z.string().email('Vui lòng nhập email hợp lệ'),
		password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự').max(255),
		fullName:
			formType === 'sign-up'
				? z.string().min(1, 'Vui lòng nhập tên đầy đủ')
				: z.string().optional(),
	});
};

const AuthForm = ({ type }: { type: FormType }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRouting, setRouting] = useState(false);
	const { setUser } = useAuthStore();
	const router = useRouter();

	const formSchema = authFormSchema(type);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			fullName: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);

		try {
			if (type === 'sign-up') {
				await signUp(values.email, values.password, values.fullName!);
			} else {
				const user = await login(values.email, values.password);
				setUser(user);
			}

			setRouting(true);
			toast.success(
				type === 'sign-up'
					? 'Đăng ký thành công, vui lòng đăng nhập.'
					: 'Đăng nhập thành công!'
			);

			router.push(type == 'sign-in' ? '/menu' : '/login');
		} catch (error: any) {
			toast.error(error.message || 'Có lỗi xảy ra!');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{isRouting && (
				<div className='fixed inset-0 z-[100] bg-gray-500/50 flex-center'>
					<Loader2 size={64} className='animate-spin text-brand' />
				</div>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='auth-form'>
					<h1 className='form-title'>
						{type === 'sign-in' ? 'Đăng nhập' : 'Đăng ký'}
					</h1>
					{type === 'sign-up' && (
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<div className='shad-form-item'>
										<FormLabel className='shad-form-label'>
											Tên của bạn
										</FormLabel>

										<FormControl>
											<Input
												placeholder='Nhập tên của bạn'
												className='shad-input'
												{...field}
											/>
										</FormControl>
									</div>

									<FormMessage className='shad-form-message' />
								</FormItem>
							)}
						/>
					)}

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<div className='shad-form-item'>
									<FormLabel className='shad-form-label'>Email</FormLabel>

									<FormControl>
										<Input
											placeholder='Nhập email của bạn'
											className='shad-input'
											{...field}
										/>
									</FormControl>
								</div>

								<FormMessage className='shad-form-message' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<div className='shad-form-item'>
									<FormLabel className='shad-form-label'>Mật khẩu</FormLabel>

									<FormControl>
										<Input
											type='password'
											placeholder='Nhập mật khẩu của bạn'
											className='shad-input'
											{...field}
										/>
									</FormControl>
								</div>

								<FormMessage className='shad-form-message' />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='form-submit-button !text-xl'
						disabled={isLoading}
					>
						{type === 'sign-in' ? 'Đăng nhập' : 'Đăng ký'}

						{isLoading && (
							<Image
								src='/assets/icons/loader.svg'
								alt='loader'
								width={24}
								height={24}
								className='ml-2 animate-spin'
							/>
						)}
					</Button>
					<div className='body-2 flex justify-center'>
						<p className='text-light-100'>
							{type === 'sign-in'
								? 'Bạn chưa có tài khoản?'
								: 'Bạn đã có tài khoản?'}
						</p>
						<Link
							href={type === 'sign-in' ? '/sign-up' : '/login'}
							className='ml-1 font-medium text-brand hover:text-brand-100'
						>
							{' '}
							{type === 'sign-in' ? 'Đăng ký' : 'Đăng nhập'}
						</Link>
					</div>
				</form>
			</Form>
		</>
	);
};

export default AuthForm;
