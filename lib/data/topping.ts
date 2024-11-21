import { EToppingType, ITopping } from "@/types/topping";

export const mockTopping: ITopping[] = [
	{
		$id: '1',
		name: 'Pepperoni',
		image: null,
		description: 'Pepperoni',
		price: 10000,
		type: EToppingType.NORMAL
	},
	{
		$id: '2',
		name: 'Mushrooms',
		image: null,
		description: 'Mushrooms',
		price: 10000,
		type: EToppingType.NORMAL
	},
	{
		$id: '3',
		name: 'Onions',
		image: null,
		description: 'Onions',
		price: 15000,
		type: EToppingType.NORMAL
	},
	{
		$id: '4',
		name: 'Olives',
		image: null,
		description: 'Olives',
		price: 20000,
		type: EToppingType.NORMAL
	},
];
