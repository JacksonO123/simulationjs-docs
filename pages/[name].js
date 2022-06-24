import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from "../components/sidebar/Sidebar"
import styles from '../styles/Home.module.css';

export default function Home() {
	const [pathname, setPathname] = useState('');
	const router = useRouter();

	useEffect(() => {
		console.log(router);
		setPathname(router.asPath.substring(1));
	}, [router]);

	return (
		<main className={styles.container}>
			<Sidebar />
			<h1>{pathname}</h1>
		</main>
	)
}