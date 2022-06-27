import { useState, useEffect } from 'react';
import { getAuthObject } from '../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { checkIsAdmin } from '../tools/firebase';

export default function Home() {
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

	return (
		admin
			? (
				<h1>create new info</h1>
			)
			: <h1>You do not have access to this page.</h1>
	);
}