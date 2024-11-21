import Header from '@/components/header';

interface Props {
	children: Readonly<React.ReactNode>;
}

export default function PageLayout({ children }: Props) {
	return (
		<>
			<Header />
			<div className='pt-20'>{children}</div>
		</>
	);
}
