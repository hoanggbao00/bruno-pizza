import { useCartStore } from '@/lib/stores/use-cart-store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartHeader() {
	const cartItemCount = useCartStore((state) => state.items.length);

	return (
		<Link href='/cart' className='inline-flex relative hover:text-brand transition-colors'>
			<ShoppingCart />
      <p className='absolute text-xs -top-1 -right-1 rounded-full bg-brand-100 size-4 text-center text-white'>{cartItemCount}</p>
		</Link>
	);
}
