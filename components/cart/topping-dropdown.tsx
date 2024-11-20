'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ICartItem, useCartStore } from '@/lib/stores/use-cart-store';

interface Props {
	item: ICartItem;
}

export default function ToppingDropdown({ item }: Props) {
	const { updateTopping } = useCartStore();

	const handleUpdateTopping = (topping: ITopping) => {
		if (item.toppings.includes(topping)) {
			updateTopping('remove', item, topping);
		} else {
			updateTopping('add', item, topping);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='px-1.5 inline-block rounded-full bg-gray-300/50 hover:bg-gray-300'>
					+
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{item.listTopping.map((topping) => (
					<DropdownMenuItem
						key={topping.id}
						onClick={() => handleUpdateTopping(topping)}
						asChild
					>
						<div className={`flex items-center gap-2`}>
							<span>
								{item.toppings.find((t) => t.id === topping.id) && '✓ '}
								{topping.name}
							</span>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
