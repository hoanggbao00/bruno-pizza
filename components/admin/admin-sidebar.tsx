'use client';
// app/admin/components/Sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	PizzaIcon,
	LayersIcon,
	TagIcon,
	ShoppingCartIcon,
	TicketIcon,
	HomeIcon,
	Donut,
	Menu,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useState } from 'react';

export const Sidebar = () => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{ href: '/admin', label: 'Dashboard', icon: HomeIcon },
		{ href: '/admin/pizzas', label: 'Pizzas', icon: PizzaIcon },
		{ href: '/admin/categories', label: 'Categories', icon: LayersIcon },
		{ href: '/admin/toppings', label: 'Toppings', icon: Donut },
		{ href: '/admin/sizes', label: 'Sizes', icon: TagIcon },
		{ href: '/admin/orders', label: 'Orders', icon: ShoppingCartIcon },
		{ href: '/admin/vouchers', label: 'Vouchers', icon: TicketIcon },
	];

	return (
		<>
			<aside className='hidden md:block w-64 bg-white border-r border-gray-200'>
				<div className='p-4'>
					<h1 className='text-2xl font-bold text-gray-800'>Admin Panel</h1>
				</div>
				<nav className='mt-4'>
					{menuItems.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
									isActive ? 'bg-gray-100 text-blue-600' : ''
								}`}
							>
								<Icon className='w-5 h-5 mr-3' />
								<span>{item.label}</span>
							</Link>
						);
					})}
				</nav>
			</aside>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<div className='absolute top-[3.5%]'>
						<Button variant='ghost' size='icon' className='md:hidden'>
							<Menu className='' />
							<span className='sr-only'>Toggle menu</span>
						</Button>
					</div>
				</SheetTrigger>
				<SheetContent side='left' className='w-[300px] sm:w-[400px]'>
					<SheetTitle>ADMIN PANEL</SheetTitle>
					<nav className='flex flex-col gap-4 mt-2'>
						{menuItems.map((route) => (
							<Link
								key={route.href}
								className='text-sm font-medium hover:text-brand transition-colors'
								href={route.href}
							>
								{route.label}
							</Link>
						))}
						<Button className='w-full bg-brand text-white hover:bg-brand/90 rounded-full px-6'>
							<Link href='/'>Back to Home</Link>
						</Button>
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
};
