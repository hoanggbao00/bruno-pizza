import Link from 'next/link';
import Image from 'next/image';
import LandingCard from '@/components/landing/landing-card';
import UserRatingPreview from '@/components/landing/user-rateing-preview';
import Header from '@/components/header';

export default function Page() {
	return (
		<>
			<Header />
			<div className='min-h-screen pt-20 bg-brand/30'>
				<main className='flex-1'>
					<section className='w-full py-10 md:py-24 lg:py-30 rounded-3xl'>
						<div className='container px-4 md:px-6'>
							<div className='grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_730px'>
								<div className='flex flex-col justify-center space-y-6'>
									<div className='space-y-2'>
										<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'>
											it&apos;s not just Food
											<br />
											It&apos;s an{' '}
											<span className='text-brand'>Experience</span>
										</h1>
										<p className='max-w-[600px] text-gray-500 md:text-xl'>
											Savor the flavor, enjoy the moment, and discover why our
											pizza is not just food—it&apos;s an experience.
										</p>
									</div>
									<div className='flex flex-col gap-2 min-[400px]:flex-row'>
										<Link
											href={'/menu'}
											className='bg-brand text-white hover:bg-brand/90 rounded-full text-3xl py-4 px-8 animate-bounce duration-700'
										>
											Order Now
										</Link>
									</div>
									<div className='flex gap-4 mt-6'>
										<Link
											className='hover:scale-110 text-gray-500 hover:text-brand transition-colors'
											href='#'
										>
											<img
												src='/assets/icons/facebook.svg'
												alt='Facebook'
												className='h-6 w-6'
											/>
										</Link>
										<Link
											className='hover:scale-110 text-gray-500 hover:text-brand transition-colors'
											href='#'
										>
											<img
												src='/assets/icons/instagram.svg'
												alt='instagram'
												className='h-6 w-6'
											/>
										</Link>
										<Link
											className='hover:scale-110 text-gray-500 hover:text-brand transition-colors'
											href='#'
										>
											<img
												src='/assets/icons/youtube.svg'
												alt='youtube'
												className='h-6 w-6'
											/>
										</Link>
									</div>
									<LandingCard />
								</div>
								<div className='relative flex items-center justify-center'>
									<div className='relative w-full aspect-square'>
										<div className='absolute inset-0 rounded-full bg-brand/20' />
										<Image
											src='/assets/images/photo-1628840042765-356cda07504e.png'
											alt='Delicious Pizza'
											fill
											className='z-10 rounded-full'
										/>
									</div>
									<UserRatingPreview />
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
}
