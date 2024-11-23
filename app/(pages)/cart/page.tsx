import CartList from '@/components/pages/cart/cart-list';

export default function Page() {
	return (
		<div className='max-w-2xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Giỏ hàng</h1>

			<CartList />
		</div>
	);
}
