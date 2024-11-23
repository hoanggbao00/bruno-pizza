import { currency, DEFAULT_IMAGE } from '@/shared/constants';
import { ICartItem } from '@/types/cart-item';
import Image from 'next/image';

interface Props {
	cartItem: ICartItem;
}

export default function DetailCard({ cartItem }: Props) {

	return (
		<div className='w-full aspect-square p-2 border rounded-md'>
			<div className='relative w-[75%] aspect-square mx-auto'>
				<Image
					src={cartItem.pizzas.images[0] ?? DEFAULT_IMAGE}
					alt={cartItem.pizzas.name}
					fill
					className='object-cover rounded-md'
				/>
			</div>
			<p className='text-center font-semibold'>
				{cartItem.pizzas.name} ({cartItem.selectedSize.name})
			</p>
			<p className='text-center text-sm'>{cartItem.selectedToppings[0]?.name}</p>
			<p className='text-brand font-semibold text-center'>{cartItem.totalPrice.toLocaleString()} {currency}</p>
		</div>
	);
}
