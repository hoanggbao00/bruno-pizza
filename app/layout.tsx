import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { APP_NAME, APP_SUBTITLE } from '@/shared/constants';
import NextTopLoader from 'nextjs-toploader';
import dynamic from 'next/dynamic';

const Toaster = dynamic(() =>
	import('@/components/ui/sonner').then((m) => m.Toaster)
);

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: {
		default: APP_NAME,
		template: `%s | ${APP_NAME}`,
	},
	description: APP_SUBTITLE,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<NextTopLoader height={5} />
				<Toaster duration={2000} richColors position='bottom-right' />
			</body>
		</html>
	);
}
