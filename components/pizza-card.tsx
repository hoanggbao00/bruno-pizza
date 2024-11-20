'use client';
import { ICartItem, useCartStore } from '@/lib/stores/use-cart-store';
import { currency } from '@/shared/constants';
import { ArrowRight, ShoppingCartIcon, Star } from 'lucide-react';
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

interface Props {
	pizza: IPizza;
}

export default function PizzaCard({ pizza }: Props) {
	const [selectedSize, setSelectedSize] = useState<IPizzaSize>(pizza.sizes[0]);
	const { updateCart } = useCartStore();
	const [toppingSelected, setToppingSelected] = useState<ITopping[]>([]);
	const router = useRouter();

	// * Edit here
	const isBestSeller = true;

	const finalPrice = useMemo(() => {
		return (
			pizza.price +
			selectedSize.price +
			toppingSelected.reduce((total, topping) => total + topping.price, 0)
		);
	}, [pizza.price, toppingSelected, selectedSize]);

	const handleAddToCart = () => {
		const finalPizza: ICartItem = {
			id: pizza.id,
			name: pizza.name,
			price: pizza.price,
			images: pizza.images,
			size: selectedSize,
			quantity: 1,
			toppings: toppingSelected.map((t) => ({
				id: t.id,
				name: t.name,
				price: t.price,
				description: t.description,
				image: t.image,
			})),
			listTopping: pizza.toppings,
		};

		updateCart('increase', finalPizza, 1);
		toast.success('Đã thêm vào giỏ hàng', {
			action: {
				label: 'Đến giỏ hàng',
				onClick: () => router.push('/cart'),
			},
			actionButtonStyle: {
				backgroundColor: 'green',
			},
		});
	};

	return (
		<Card
			key={pizza.id}
			className='bg-white rounded-3xl p-4 relative group md:rounded-tr-[8rem] md:rounded-tl-[8rem] rounded-tr-[10rem] rounded-tl-[10rem] hover:scale-105 hover:motion-preset-flomoji-🚀 hover:motion-duration-500 transition-all hover:shadow-drop-1 hover:bg-brand/50 group hover:border-brand hover:border-2'
		>
			{isBestSeller && (
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
			<div className='aspect-square relative mb-4'>
				<Image
					src={pizza.images[0] ?? ''}
					alt={pizza.name}
					fill
					className='object-cover rounded-full'
				/>
			</div>
			<div>
				<h3 className='text-xl font-semibold mb-1'>{pizza.name}</h3>
				<p className='text-sm font-semibold mb-1 text-brand'>
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
			<p className='font-semibold text-sm mb-0.5'>Topping</p>

			<SelectTopping
				toppings={pizza.toppings}
				onChange={setToppingSelected}
				selectedValue={toppingSelected}
			/>

			<CardFooter className='justify-between gap-2 px-0 pb-0'>
				<Link
					href={`/pizza/${pizza.id}`}
					className='rounded-full bg-gray-300 hover:bg-gray-300/90 size-10 flex-center text-white'
				>
					<ArrowRight className='h-5 w-5' />
					<span className='sr-only'>Detail</span>
				</Link>
				<Button
					className='size-10 rounded-full bg-brand hover:bg-brand/90 flex-1'
					onClick={handleAddToCart}
				>
					<ShoppingCartIcon className='size-5' strokeWidth={3} />
					<span className='sr-only'>Add to cart</span>
				</Button>
			</CardFooter>
		</Card>
	);
}
