import styles from '../styles/Button.module.css';

export default function Button({ children, color, onClick }) {

	const handleClick = e => {
		if (onClick) {
			onClick(e);
		}
	}

	return (
		<button className={`${styles.button} ${styles[color]}`} onClick={handleClick}>{children}</button>
	)
}