'use client';
import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '@/shared/hooks/use-debounce';
import { ICategory } from '@/types/category';

interface Props {
	categories: ICategory[];
	searchParams: {
		category?: string;
	};
}

export default function CategoryFilter({ searchParams, categories }: Props) {
	const [categorySelected, setCategorySelected] = useState(
		searchParams.category ?? 'all'
	);
	const router = useRouter();
	const handleFilter = () => {
		router.replace(`?category=${categorySelected}`);
	};
	const debounceFilter = useDebounce(handleFilter, 500);

	useEffect(() => {
		if (categorySelected) {
			debounceFilter();
		}
	}, [categorySelected]);

	return (
		<div className='flex flex-wrap justify-center gap-2 mb-12'>
			{
				<Button
					key={'all'}
					variant={categorySelected == 'all' ? 'default' : 'outline'}
					className={`rounded-full px-6 ${
						categorySelected == 'all'
							? 'bg-[#FF7B6B] hover:bg-[#FF7B6B]/90'
							: ''
					}`}
					onClick={() => setCategorySelected('all')}
				>
					Tất cả
				</Button>
			}
			{categories.map((category) => (
				<Button
					key={category.name}
					variant={categorySelected == category.slug ? 'default' : 'outline'}
					className={`rounded-full px-6 ${
						categorySelected == category.slug
							? 'bg-[#FF7B6B] hover:bg-[#FF7B6B]/90'
							: ''
					}`}
					onClick={() => setCategorySelected(category.slug)}
				>
					{category.name}
				</Button>
			))}
		</div>
	);
}
