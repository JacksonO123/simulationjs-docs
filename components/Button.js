import styles from '../styles/Button.module.css';

export default function Button({ children, color = 'blue', onClick, sx = {}, size = 'medium' }) {
	const sizes = ['large', 'medium', 'small'];
	size = sizes.includes(size) ? size : 'medium';

	const handleClick = e => {
		if (onClick) {
			onClick(e);
		}
	}

	return (
		<button style={sx} className={`${styles.button} ${styles[size]} ${styles[color]}`} onClick={handleClick}>{children}</button>
	)
}