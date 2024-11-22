'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useCartStore, { StoreCartItem } from '@/lib/stores/use-cart-store';
import { ITopping } from '@/types/topping';

interface Props {
	item: StoreCartItem;
}

export default function ToppingDropdown({ item }: Props) {
	const { updateItemToppings } = useCartStore();

	const handleUpdateTopping = (topping: ITopping) => {
		const isFound = item.selectedToppings.find((t) => t.$id === topping.$id);
		if (isFound) {
			updateItemToppings(
				item,
				item.selectedToppings.filter((t) => t.$id !== topping.$id)
			);
		} else {
			updateItemToppings(item, [...item.selectedToppings, topping]);
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
				{item.listToppings.map((topping) => (
					<DropdownMenuItem
						key={topping.$id}
						onClick={() => handleUpdateTopping(topping)}
						asChild
					>
						<div className={`flex items-center gap-2`}>
							<span>
								{item.selectedToppings.find((t) => t.$id === topping.$id) && '✓ '}
								{topping.name}
							</span>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
