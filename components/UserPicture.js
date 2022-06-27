import styles from '../styles/UserPicture.module.css';

export default function UserPicture({ user }) {
	return (
		<div className={styles.pictureWrapper}>
			<img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
		</div>
	)
}