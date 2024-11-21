'use client';

import { ITopping } from '@/types/topping';
import { useEffect, useState } from 'react';

interface Props {
	toppings: ITopping[];
	selectedValue?: ITopping[];
	onChange?: (size: ITopping[]) => void;
}

export default function SelectTopping({
	toppings,
	selectedValue,
	onChange,
}: Props) {
	const [selectedTopping, setSelectedTopping] = useState(selectedValue ?? []);

	const handleUpdateTopping = (topping: ITopping) => {
		if (selectedTopping.includes(topping)) {
			setSelectedTopping(selectedTopping.filter((t) => t.$id !== topping.$id));
		} else {
			setSelectedTopping([...selectedTopping, topping]);
		}
	};

	useEffect(() => {
		if (onChange && selectedTopping) {
			onChange(selectedTopping);
		}
	}, [selectedTopping]);

	return (
		<div className='flex gap-2 mb-4 flex-wrap'>
			{toppings.map((topping) => (
				<button
					key={topping.$id}
					onClick={() => handleUpdateTopping(topping)}
					className={`px-3 py-1 rounded-full text-sm transition-colors ${
						selectedTopping.includes(topping)
							? 'bg-brand text-white hover:bg-brand-100 group-hover:border-white group-hover:border'
							: 'bg-gray-100 text-gray-800 hover:bg-brand/70 hover:text-white'
					}`}
				>
					{topping.name}
				</button>
			))}
		</div>
	);
}
