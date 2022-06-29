import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from "../components/sidebar/Sidebar"
import styles from '../styles/Home.module.css';
import Header from '../components/header/Header';
import { getAuthObject } from '../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { checkIsAdmin } from '../tools/firebase';

export default function Home() {
	const [pathname, setPathname] = useState('');
	const router = useRouter();
	const auth = getAuthObject();
	const [user, loading, error] = useAuthState(auth);
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		(async () => {
			if (user) {
				const isAdmin = await checkIsAdmin(user);
				setAdmin(isAdmin);
				console.log(isAdmin);
			}
		})();
	}, [user]);

	useEffect(() => {
		setPathname(router.asPath.substring(1));
	}, [router]);

	return (
		<main className={styles.container}>
			<Sidebar admin={admin} />
			<div className={styles.full}>
				<Header user={user} userLoading={loading} />
			</div>
		</main >
	)
}