'use client';

import { IPizzaSize } from '@/types/size';
import { useEffect, useState } from 'react';

interface Props {
	sizes: IPizzaSize[];
	selectedValue?: IPizzaSize;
	onChange?: (size: IPizzaSize) => void;
}

export default function SelectSize({ sizes, selectedValue, onChange }: Props) {
	const [selectedSize, setSelectedSize] = useState(selectedValue);

	useEffect(() => {
		if (onChange && selectedSize) {
			onChange(selectedSize);
		}
	}, [selectedSize]);

	return (
		<div className='flex gap-2 mb-4'>
			{sizes.map((size) => (
				<button
					key={size.$id}
					onClick={() => setSelectedSize(size)}
					className={`px-3 py-1 rounded-full text-sm transition-colors ${
						selectedSize?.$id === size.$id
							? 'bg-brand text-white hover:bg-brand-100 group-hover:border-white group-hover:border'
							: 'bg-gray-100 text-gray-800 hover:bg-brand/70 hover:text-white'
					}`}
				>
					{size.name}
				</button>
			))}
		</div>
	);
}
