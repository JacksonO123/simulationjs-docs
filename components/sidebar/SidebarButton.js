import styles from '../../styles/SidebarButton.module.css';
import SidebarItem from './SidebarItem';

export default function SidebarButton({ children, onClick }) {

	const handleClick = e => {
		e.stopPropagation();
		if (onClick)
			onClick(e);
	}

	return (
		<button className={styles.btn} onClick={handleClick}>
			<SidebarItem>{children}</SidebarItem>
		</button>
	)
}