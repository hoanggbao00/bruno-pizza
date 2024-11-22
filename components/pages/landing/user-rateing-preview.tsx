import { Star } from 'lucide-react';
import Image from 'next/image';

export default function UserRatingPreview() {
	return (
		<div className='absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg z-10'>
			<div className='flex -space-x-2'>
				<Image
					src='/assets/images/avatar.png'
					alt='User Avatar'
					width={32}
					height={32}
					className='rounded-full border-2 border-white'
				/>
				<Image
					src='/assets/images/avatar.png'
					alt='User Avatar'
					width={32}
					height={32}
					className='rounded-full border-2 border-white'
				/>
				<Image
					src='/assets/images/avatar.png'
					alt='User Avatar'
					width={32}
					height={32}
					className='rounded-full border-2 border-white'
				/>
			</div>
				<div className='flex items-center gap-1'>
					<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
					<span className='font-semibold'>5.0</span>
				</div>
		</div>
	);
}
