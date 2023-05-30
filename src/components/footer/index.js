import styles from './footer.module.scss'
import Image from 'next/image'
import logo from '@/assets/logo/logo.png';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a href="https://shyechern.com" target="_blank" rel="noopener noreferrer">
				Created by &nbsp;<Image src={logo} alt="Shye Chern's Logo" height={60} width={200} />
			</a>
		</footer>
	);
}
