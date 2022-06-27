import styles from '../styles/Input.module.css';

export default function Input({ placeholder, sx = {}, onChange, value, disabled = false }) {

	const handleChange = e => {
		if (onChange) {
			onChange(e);
		}
	}

	return (
		<input
			placeholder={placeholder}
			style={sx}
			className={styles.input}
			onChange={handleChange}
			value={value}
			disabled={disabled}
		/>
	);
}