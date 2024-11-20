interface Props {
	children: Readonly<React.ReactNode>;
}

export default function PageLayout({ children }: Props) {
	return <div className='pt-20'>{children}</div>;
}
