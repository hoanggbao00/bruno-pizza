import Image from 'next/image';
import { Card } from '../../ui/card';
import { Star } from 'lucide-react';

export default function LandingCard() {
	return (
		<Card className='w-fit mt-6 bg-brand/70 backdrop-blur-md rounded-bl-[2.5rem] rounded-tr-[2.5rem] px-2'>
			<div className='flex items-center gap-4 p-4'>
				<div className='relative h-28 aspect-video border-2 border-white rounded-lg rounded-bl-[2.5rem] rounded-tr-[2.5rem] overflow-hidden'>
					<Image
						src='/assets/images/photo-1628840042765-356cda07504e.png'
						alt='Italian Pizza'
						fill
            objectFit='cover'
						className='rounded-lg'
					/>
				</div>
				<div className='space-y-1'>
					<h3 className='font-semibold text-white'>Italian Pizza</h3>
					<div className='flex items-center gap-1'>
						<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
						<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
						<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
						<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
						<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
					</div>
					<p className='text-sm text-gray-500'>$15.00</p>
				</div>
			</div>
		</Card>
	);
}
