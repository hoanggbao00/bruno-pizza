'use client';

import { Play } from 'lucide-react';
import { Button } from '../../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog';

export default function HowToBuild() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='rounded-full gap-2'>
					<Play className='h-4 w-4' />
					Hướng dẫn
				</Button>
			</DialogTrigger>
			<DialogContent className='md:min-w-[80vw]'>
				<DialogTitle>Làm sao để thực hiện hóa ý tưởng của bạn?</DialogTitle>
				<DialogDescription>Xem hướng dẫn qua video dưới đây</DialogDescription>
				<div className='w-full'>
					<iframe
						width='100%'
						height='auto'
						src='https://www.youtube.com/embed/W85F-UmnbF4?si=BRkKwt7s0k4p_887'
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen
            className='aspect-video rounded-md'
					></iframe>
				</div>
			</DialogContent>
		</Dialog>
	);
}
