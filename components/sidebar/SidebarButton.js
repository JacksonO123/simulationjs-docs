import styles from '../../styles/SidebarButton.module.css';
import SidebarItem from './SidebarItem';
import Link from '../Link';

export default function SidebarButton({ children, onClick, to = null }) {

	const handleClick = e => {
		e.stopPropagation();
		if (onClick)
			onClick(e);
	}

	return (
		to != null
			? (
				<Link to={to}>
					<button className={styles.btn} onClick={handleClick}>
						<SidebarItem>{children}</SidebarItem>
					</button>
				</Link>
			)
			: (
				<button className={styles.btn} onClick={handleClick}>
					<SidebarItem>{children}</SidebarItem>
				</button>
			)
	)
}