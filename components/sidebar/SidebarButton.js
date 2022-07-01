import styles from '../../styles/SidebarButton.module.css';
import SidebarItem from './SidebarItem';
import XSvg from '../svgs/XSvg';
import SmallButton from './SmallButton';
import { useRouter } from 'next/router';
import AddSvg from '../svgs/AddSvg';
import EditSvg from '../svgs/EditSvg';

export default function SidebarButton({
	children,
	onClick,
	to = null,
	active = false,
	admin = false,
	handleDeleteDoc,
	isDropdown = false
}) {
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
			{admin && (
				<>
					<SmallButton sx={buttonStyles} onClick={handleDeleteDoc}>
						<XSvg color="#ffffff" />
					</SmallButton>
					<SmallButton sx={buttonStyles}>
						<EditSvg color="#ffffff" />
					</SmallButton>
					{isDropdown && (
						<SmallButton sx={buttonStyles}>
							<AddSvg color="#ffffff" />
						</SmallButton>
					)}
				</>
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