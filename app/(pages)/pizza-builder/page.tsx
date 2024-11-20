import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import HowToBuild from '@/components/pizza-builder/how-to-build';
import BuildNow from '@/components/pizza-builder/build-now';

export default function Page() {
	return (
		<div className='h-[calc(100vh_-5rem)] bg-[#FFF5F5]'>
			<main className='container mx-auto px-4 py-12'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					{/* Left Content */}
					<div className='space-y-8'>
						<div className='space-y-4'>
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
								Satisfy Your Cravings
								<br />
								With Our Pizza
							</h1>
							<p className='text-lg text-gray-600 max-w-lg'>
								From Classic Favorites To Creative New Combinations, We&apos;ve
								Got Something For Every Pizza Lover. Join Us For A Slice Of
								Heaven
							</p>
						</div>

						{/* CTA Buttons */}
						<div className='flex flex-wrap gap-4'>
							<BuildNow />
							<HowToBuild />
						</div>

						{/* Customer Reviews */}
						<div className='space-y-6'>
							<div className='flex items-center gap-4'>
								<div className='flex -space-x-2'>
									{[1, 2, 3].map((i) => (
										<div
											key={i}
											className='w-10 h-10 rounded-full border-2 border-white overflow-hidden'
										>
											<Image
												src='/assets/images/photo-1565299624946-b28f40a0ae38.png'
												alt={`Customer ${i}`}
												width={40}
												height={40}
												className='w-full h-full object-cover'
											/>
										</div>
									))}
								</div>
								<div>
									<div className='font-semibold'>500+ Happy Customer</div>
									<div className='flex items-center gap-1 text-sm'>
										<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
										<span>4.8 (420 Reviews)</span>
									</div>
								</div>
							</div>

							{/* Stats Cards */}
							<div className='grid grid-cols-3 gap-4'>
								<Card className='p-4 text-center bg-white/80 backdrop-blur-sm'>
									<div className='text-2xl font-bold'>1k+</div>
									<div className='text-sm'>Feedback Loved</div>
								</Card>
								<Card className='p-4 text-center bg-white/80 backdrop-blur-sm'>
									<div className='text-2xl font-bold'>20+</div>
									<div className='text-sm'>Flavor</div>
								</Card>
								<Card className='p-4 text-center bg-white/80 backdrop-blur-sm'>
									<div className='text-2xl font-bold'>100+</div>
									<div className='text-sm'>Ingredients</div>
								</Card>
							</div>
						</div>
					</div>

					{/* Right Image */}
					<div className='relative'>
						<div className='relative aspect-square'>
							<Image
								src='/assets/images/photo-1565299624946-b28f40a0ae38.png'
								alt='Delicious melting cheese pizza'
								fill
								className='object-cover rounded-lg'
								priority
							/>
							{/* Decorative elements */}
							<div className='absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce' />
							<div className='absolute top-1/4 -right-8 w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-100' />
							<div className='absolute top-1/2 -right-6 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-200' />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
