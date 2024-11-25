'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, PhoneCall } from 'lucide-react';
import { APP_NAME, PHONE_CONTACT, ROUTES } from '@/shared/constants';
import UserDropdown from './user-dropdown';
import CartHeader from './cart-header';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header
			className={cn('px-4 h-20 flex items-center fixed z-50 inset-x-0', {
				'bg-white': pathname != '/',
			})}
		>
			<nav className='md:container ml-auto flex items-center gap-4 sm:gap-6 justify-between flex-1'>
				<Link
					className={cn(
						'relative flex items-center justify-center h-16 w-28 ',
						{
							'bg-brand/30': pathname === '/',
						}
					)}
					href='/'
				>
					<Image
						src={'/assets/images/pizzeria.png'}
						fill
						alt='logo'
						className='!mix-blend-multiply'
					/>
				</Link>
				<div className='hidden md:flex items-center gap-4 sm:gap-6'>
					{ROUTES.map((route) => (
						<Link
							key={route.href}
							className='font-medium hover:text-brand transition-colors'
							href={route.href}
						>
							{route.label}
						</Link>
					))}
				</div>
				<div className='flex items-center gap-4'>
					<CartHeader />
					<UserDropdown />
					<Link href={`tel:${PHONE_CONTACT}`}>
						<Button className='hidden md:inline-flex bg-brand text-white hover:bg-brand/90 rounded-full px-6'>
							<PhoneCall /> Contact
						</Button>
					</Link>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon' className='md:hidden'>
								<Menu className='h-6 w-6' />
								<span className='sr-only'>Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='w-[300px] sm:w-[400px]'>
							<SheetTitle>{APP_NAME}</SheetTitle>
							<nav className='flex flex-col gap-4 mt-2'>
								{ROUTES.map((route) => (
									<Link
										key={route.href}
										className='text-sm font-medium hover:text-brand transition-colors'
										href={route.href}
									>
										{route.label}
									</Link>
								))}
								<Button className='w-full bg-brand text-white hover:bg-brand/90 rounded-full px-6'>
									Contact
								</Button>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
