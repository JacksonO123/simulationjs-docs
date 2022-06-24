import styles from '../../styles/SidebarItem.module.css';

export default function SidebarItem({ children, border = false, sx = {} }) {
	return (
		<div className={`${styles.item} ${border && styles.bordered}`} style={sx}>
			{children}
		</div>
	)
}