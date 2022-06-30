import styles from '../../styles/SidebarButton.module.css';
import SidebarItem from './SidebarItem';
import XSvg from '../XSvg';
import SmallButton from './SmallButton';
import { useRouter } from 'next/router';

export default function SidebarButton({ children, onClick, to = null, active = false, removable = false, handleDeleteDoc }) {
	const router = useRouter();

	const handleClick = e => {
		if (onClick)
			onClick(e);
	}

	const buttonStyles = {
		marginRight: 15,
		height: 24
	};

	const handleTo = e => {
		e.stopPropagation();
		if (router.asPath != to) {
			router.push(to);
		}
	}

	const button = (
		<button className={`${styles.btn} ${active === to && styles.active}`} onClick={handleClick}>
			<SidebarItem>{children}</SidebarItem>
			{removable && (
				<SmallButton sx={buttonStyles} onClick={handleDeleteDoc}>
					<XSvg color="#ffffff" />
				</SmallButton>
			)}
		</button>
	);

	return (
		to != null
			? (
				<div onClick={handleTo}>
					{button}
				</div>
			)
			: (
				button
			)
	)
}