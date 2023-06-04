import '@/styles/style.scss';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Spinner Wheel App',
	description: 'Spinner wheel created by Shye Chern',
	author: [{ name: 'Shye Chern' }],
	keywords: ['Spinner', 'Wheel', 'Shye Chern'],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className} style={{ minHeight: '100vh', position: 'relative' }}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
