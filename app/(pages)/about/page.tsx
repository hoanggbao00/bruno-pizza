import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, PhoneCall, Pizza, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { PHONE_CONTACT } from '@/shared/constants';

export default function Component() {
	return (
		<div className='min-h-screen bg-[#FFF5F5] relative overflow-hidden'>
			<div className='container mx-auto px-4 py-12 md:py-24'>
				{/* Hero Section */}
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div className='relative'>
						<div className='relative w-full aspect-square'>
							<div className='absolute inset-0 bg-brand rounded-full' />
							<div className='absolute top-0 left-0 w-3 h-3 bg-white rounded-full' />
							<div className='absolute top-1/4 right-0 w-3 h-3 bg-white rounded-full' />
							<Image
								src='/assets/images/photo-1565299624946-b28f40a0ae38.png'
								alt='Delicious Pizza'
								fill
								className='p-8 rounded-full'
							/>
						</div>
					</div>
					<div className='space-y-6'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>
							Pizza độc đáo
							<br />
							<span className='text-brand'>Sáng tạo niềm vui</span>
						</h1>
						<p className='text-lg text-gray-700 max-w-lg'>
							Cùng nhau xây dựng sự sáng tạo của các bạn với chúng tôi.
						</p>
					</div>
				</div>

				{/* Memories Section */}
				<div className='mt-24 grid lg:grid-cols-2 gap-12 items-center'>
					<div className='relative grid grid-cols-2 gap-4'>
						<div className='relative aspect-[3/4] rounded-[2rem] overflow-hidden'>
							<Image
								src='/assets/images/photo-1565299624946-b28f40a0ae38.png'
								alt='People enjoying pizza'
								fill
								className='object-cover'
							/>
						</div>
						<div className='relative aspect-[3/4] rounded-[2rem] overflow-hidden mt-12'>
							<Image
								src='/assets/images/photo-1565299624946-b28f40a0ae38.png'
								alt='Happy customers'
								fill
								className='object-cover'
							/>
						</div>
					</div>
					<div className='space-y-6'>
						<h2 className='text-4xl font-bold'>
							<span className='text-brand'>Xây dựng kỉ niệm</span>
							<br />
							về hương vị
						</h2>
						<p className='text-lg text-gray-700'>
							Chúng tôi biết Pizza không chỉ có ý nghĩa về mặt lương thực. Nhưng
							với chúng tôi, Pizza còn hơn thế nữa! Cùng với sự sáng tạo của các
							bạn và sự không ngừng cải tiến của chúng tôi.
						</p>
						<div className='flex gap-4 items-center'>
							<Link
								href='/pizza-builder'
								className='bg-brand text-white hover:bg-brand/90 rounded-full py-4 px-6 text-xl flex gap-2'
							>
								<Pizza /> Sáng tạo ngay
							</Link>
							<Link href={'/menu'}>
								<Button variant='outline' className='rounded-full gap-2 group'>
									Tìm hiểu thêm
									<ArrowRight className='h-4 w-4' />
								</Button>
							</Link>
						</div>
					</div>
				</div>

				{/* Perfect Companions Section */}
				<div className='mt-24 grid lg:grid-cols-2 gap-12 items-center'>
					<div className='space-y-6'>
						<h2 className='text-4xl font-bold'>
							<span className='text-brand'>Tuỳ tay mà chọn,</span>
							<br />
							ngon không phải bàn
						</h2>
						<div className='flex gap-4 items-center'>
							<Link
								href='/menu'
								className='bg-brand text-white hover:bg-brand/90 rounded-full py-4 px-6 text-xl flex gap-2'
							>
								<ShoppingCart /> Khám phá ngay
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className='relative aspect-square rounded-3xl overflow-hidden'
							>
								<Image
									src='/assets/images/photo-1565299624946-b28f40a0ae38.png'
									alt={`Pizza companion ${i}`}
									fill
									className='object-cover'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Contact Information */}
				<div className='w-full h-[640px] relative'>
					<h2 className='text-2xl font-bold text-brand'>Địa chỉ</h2>
					<div className='absolute w-full h-[600px] bg-gray-300 rounded-md animate-pulse text-xl flex-center text-brand'>
						Đang khởi tạo Google Maps....
					</div>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5379.431685743236!2d-93.61791790192432!3d47.61221475437148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ba6f20bfb64237%3A0x7c9f5b53d38d5e9b!2sLittle%20Dick%20Lake!5e0!3m2!1sen!2s!4v1732100714797!5m2!1sen!2s'
						width='100%'
						height='600'
						allowFullScreen={false}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						className='rounded-lg overflow-hidden absolute w-full h-[600px]'
					></iframe>
				</div>

				{/* Thank You Message */}
				<div className='text-center mt-24'>
					<h2 className='text-2xl md:text-3xl font-bold'>
						Cảm ơn vì
						<br />
						<span className=' text-brand'>Tình yêu</span>
						<br />
						với
						<br />
						<span className=' text-brand'>Pizza</span>
					</h2>
				</div>
			</div>
		</div>
	);
}
