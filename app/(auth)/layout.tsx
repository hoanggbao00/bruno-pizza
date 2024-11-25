import React from 'react';
import Image from 'next/image';
import { APP_DESCRIPTION, APP_NAME, APP_SUBTITLE } from '@/shared/constants';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen'>
			<section className='hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5'>
				<div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-10'>
					<h1 className='h1 text-white'>{APP_NAME}</h1>

					<div className='space-y-5 text-white'>
						<h2 className='h2'>{APP_SUBTITLE}</h2>
						<p className='body-1'>{APP_DESCRIPTION}</p>
					</div>
					<Image
						src='/assets/images/files.png'
						alt='Files'
						width={342}
						height={342}
						className='transition-all hover:rotate-2 hover:scale-105'
					/>
				</div>
			</section>

			<section className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0 relative'>
				<div className='mb-16 lg:hidden'>
					<h1 className='h1 text-brand'>{APP_NAME}</h1>
				</div>
				<Link
					href='/'
					className='absolute top-5 left-5 z-10 group flex gap-2 items-center bg-gray-500/10 p-1 rounded-md hover:bg-brand-100/20 transition-colors'
				>
					<ChevronLeft size={24} />
					<p className='hidden group-hover:block'>Back to home</p>
				</Link>

				{children}
			</section>
		</div>
	);
}
