import styles from '../../styles/SidebarDropdown.module.css';
import SidebarButton from './SidebarButton';
import AngleSvg from '../AngleSvg';
import { useState, useRef, useEffect } from 'react';

const alterChildren = (children) => {
	console.log(children);
	return children;
}

export default function SidebarDropdown({ text, children }) {
	const [open, setOpen] = useState(false);
	const [dropdownHeight, setDropdownHeight] = useState(0);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const height = dropdownRef.current.getBoundingClientRect().height;
		setDropdownHeight(height);
	}, []);

	const handleToggleDropdown = () => {
		setOpen(prev => !prev);
	}

	return (
		<div className={styles.sidebarDropdown}>
			<SidebarButton onClick={handleToggleDropdown}>
				<div className={styles.toggle}>
					<div className={`${styles.arrow} ${open && styles.rotated}`}>
						<AngleSvg color="#ffffff" />
					</div>
					{text}
				</div>
			</SidebarButton>
			<div className={styles.contentWrapper} style={open ? { height: `${dropdownHeight}px` } : { height: '0px' }}>
				<div className={styles.content} ref={dropdownRef}>
					{children}
				</div>
			</div>
		</div>
	)
}