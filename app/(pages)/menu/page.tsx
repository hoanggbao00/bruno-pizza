import { pizzas } from '@/lib/data/pizza';
import CategoryFilter from '@/components/menu/category-filter';
import { categories } from '@/lib/data/category';
import MenuList from '@/components/menu/menu-list';

interface Props {
	searchParams: Promise<{
		category?: string;
	}>;
}

export default async function Page({ searchParams }: Props) {
	const s = await searchParams;
	return (
		<div className='min-h-screen px-4 md:px-6'>
			<div className='container mx-auto max-w-6xl pb-10'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						<span className='text-[#FF7B6B]'>Menu</span> That{' '}
						<span className='text-[#FF7B6B]'>Always</span>
						<br />
						Make You Fall In <span className='text-[#FF7B6B]'>Love</span>
					</h1>
				</div>

				{/* Categories */}
				<CategoryFilter searchParams={s} categories={categories} />

				{/* Menu Grid */}
				<MenuList initialData={pizzas} />
			</div>
		</div>
	);
}
