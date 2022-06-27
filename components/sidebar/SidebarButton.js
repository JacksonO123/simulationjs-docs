import styles from '../../styles/SidebarButton.module.css';
import SidebarItem from './SidebarItem';
import Link from '../Link';

export default function SidebarButton({ children, onClick, to = null, active = false }) {

	const handleClick = e => {
		e.stopPropagation();
		if (onClick)
			onClick(e);
	}

	const button = (
		<button className={`${styles.btn} ${active === to && styles.active}`} onClick={handleClick}>
			<SidebarItem>{children}</SidebarItem>
		</button>
	);

	return (
		to != null
			? (
				<Link to={to}>
					{button}
				</Link>
			)
			: (
				button
			)
	)
}