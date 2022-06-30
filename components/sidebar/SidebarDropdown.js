import styles from '../../styles/SidebarDropdown.module.css';
import SidebarButton from './SidebarButton';
import AngleSvg from '../AngleSvg';
import { useState, useRef, useEffect } from 'react';
import { deleteDropdown } from '../../tools/firebase';

export default function SidebarDropdown({ text, children, isOpen = false, removable = false, fetchTabs }) {
	const [open, setOpen] = useState(isOpen);
	const [dropdownHeight, setDropdownHeight] = useState(0);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const height = dropdownRef.current.getBoundingClientRect().height;
		setDropdownHeight(height);
	}, [dropdownRef]);

	const handleToggleDropdown = () => {
		setOpen(prev => !prev);
	}

	const handleDeleteDoc = async () => {
		await deleteDropdown(text);
		fetchTabs();
	}

	return (
		<div className={styles.sidebarDropdown}>
			<SidebarButton
				onClick={handleToggleDropdown}
				removable={removable}
				handleDeleteDoc={handleDeleteDoc}
			>
				<div className={`${styles.arrow} ${open && styles.rotated}`}>
					<AngleSvg color="#ffffff" />
				</div>
				<span className={styles.span}>
					{text}
				</span>
			</SidebarButton>
			<div className={styles.contentWrapper} style={open ? { height: `${dropdownHeight}px` } : { height: '0px' }}>
				<div className={styles.content} ref={dropdownRef}>
					{children}
				</div>
			</div>
		</div>
	)
}