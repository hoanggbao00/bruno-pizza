'use client';
import { currency } from '@/shared/constants';
import { ArrowRight, Loader2, ShoppingCartIcon, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { Card, CardFooter } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRouter } from 'nextjs-toploader/app';
import { Badge } from './ui/badge';
import SelectSize from './select-size';
import SelectTopping from './select-topping';
import { IPizza } from '@/types/pizza';
import useCartStore, { StoreCartItem } from '@/lib/stores/use-cart-store';
import { ITopping } from '@/types/topping';
import { IPizzaSize } from '@/types/size';

interface Props {
	pizza: IPizza;
}

export default function PizzaCard({ pizza }: Props) {
	const [selectedSize, setSelectedSize] = useState<IPizzaSize>(pizza.sizes[0]);
	const { addItem } = useCartStore();
	const [toppingSelected, setToppingSelected] = useState<ITopping[]>(
		pizza.category.slug == 'custom' ? pizza.toppings : []
	);
	const router = useRouter();

	const finalPrice = useMemo(() => {
		return (
			pizza.price +
			selectedSize.price +
			toppingSelected.reduce((total, topping) => total + topping.price, 0)
		);
	}, [pizza.price, toppingSelected, selectedSize]);

	const handleAddToCart = () => {
		const finalPizza: StoreCartItem = {
			pizzas: pizza,
			selectedSize: selectedSize,
			selectedToppings: toppingSelected,
			quantity: 1,
			totalPrice: finalPrice,
			listToppings: pizza.toppings,
		};

		addItem(finalPizza);
		toast.success('Added to cart', {
			action: {
				label: 'Jump to cart',
				onClick: () => router.push('/cart'),
			},
			actionButtonStyle: {
				backgroundColor: 'green',
			},
		});
	};

	return (
		<Card
			key={pizza.$id}
			className='bg-white rounded-3xl p-4 relative group md:rounded-tr-[8rem] md:rounded-tl-[8rem] rounded-tr-[10rem] rounded-tl-[10rem] hover:scale-105 hover:motion-preset-flomoji-🚀 hover:motion-duration-500 transition-all hover:shadow-drop-1 hover:bg-brand/20 flex flex-col gap-2 justify-between'
		>
			<div>
				{pizza.isBestSeller && (
					<div className='absolute top-[15%] -right-9 z-10'>
						<Badge className='bg-brand rotate-90 hover:bg-brand cursor-default'>
							<Star
								fill='yellow'
								stroke='transparent'
								className='mr-1'
								size={16}
							/>{' '}
							Best Seller
						</Badge>
					</div>
				)}
				<Link href={`/pizza/${pizza.$id}`}>
					<div className='aspect-square relative mb-4'>
						<div className='absolute inset-0 bg-gray-200 animate-pulse rounded-full grid place-items-center'>
							<Loader2 size={48} className='animate-spin' />
						</div>
						<Image
							src={pizza.images[0] ?? ''}
							alt={pizza.name}
							fill
							className='object-cover rounded-full hover:motion-preset-confetti'
						/>
					</div>
				</Link>
				<div>
					<h3 className='text-xl font-semibold mb-1 line-clamp-2'>
						{pizza.name}
					</h3>
					<p className='text-lg font-semibold mb-1 text-brand'>
						{finalPrice.toLocaleString()}
						{currency}
					</p>
				</div>
				<p className='font-semibold text-sm mb-0.5'>Size</p>
				<SelectSize
					sizes={pizza.sizes}
					onChange={setSelectedSize}
					selectedValue={selectedSize}
				/>
				<p className='font-semibold text-sm mb-0.5'>Base</p>

				<SelectTopping
					toppings={pizza.toppings}
					onChange={setToppingSelected}
					selectedValue={toppingSelected}
					isMultiple={false}
					isCustom={pizza.category.slug === 'custom'}
				/>
			</div>

			<CardFooter className='justify-between gap-2 px-0 pb-0'>
				<Link
					href={`/pizza/${pizza.$id}`}
					className='rounded-full bg-gray-300 hover:bg-gray-700/70 size-10 flex-center text-white'
				>
					<ArrowRight className='h-5 w-5' />
					<span className='sr-only'>Detail</span>
				</Link>
				<Button
					className='size-10 rounded-full bg-brand hover:bg-brand/90 flex-1'
					onClick={handleAddToCart}
				>
					<ShoppingCartIcon className='size-5' strokeWidth={3} /> Add to cart
					<span className='sr-only'>Add to cart</span>
				</Button>
			</CardFooter>
		</Card>
	);
}
