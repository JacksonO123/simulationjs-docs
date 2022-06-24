import styles from '../../styles/Sidebar.module.css';
import SidebarItem from './SidebarItem';
import SidebarDropdown from './SidebarDropdown';
import SidebarButton from './SidebarButton';

export default function Sidebar() {

	const titleStyles = {
		padding: 15,
		marginBottom: 15,
		color: 'white'
	};

	return (
		<section className={styles.sidebar}>
			<SidebarItem sx={titleStyles}>
				<h2 className={styles.title}>
					Simulation.js
					<br />
					Documentation
				</h2>
			</SidebarItem>
			<SidebarDropdown text="Graphics Objects">
				<SidebarButton>Square</SidebarButton>
				<SidebarButton>Circle</SidebarButton>
				<SidebarButton>Polygon</SidebarButton>
				<SidebarButton>Line</SidebarButton>
			</SidebarDropdown>
		</section>
	);
}