import styles from '../../styles/Header.module.css';
import Search from './Search';
import Button from '../Button';
import { signIn } from '../../tools/firebase';
import UserPicture from '../UserPicture';
import Loading from '../Loading';

export default function Header({ user, userLoading }) {

	const handleSignIn = () => {
		signIn();
	}

	return (
		<header className={styles.header}>
			<Search placeholder="Search" />
			{
				user
					? <UserPicture user={user} />
					: userLoading
						? <Loading size="small" />
						: <Button color="blue" onClick={handleSignIn}>Sign in as admin</Button>
			}
		</header>
	);
}