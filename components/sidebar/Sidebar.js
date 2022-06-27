import styles from '../../styles/Sidebar.module.css';
import SidebarItem from './SidebarItem';
import SidebarDropdown from './SidebarDropdown';
import SidebarButton from './SidebarButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

const SidebarContent = ({ content }) => {

	const [pathname, setPathname] = useState('');
	const router = useRouter();

	useEffect(() => {
		const currentPath = router.asPath;
		setPathname(currentPath);
	}, [router]);

	const checkDropdownPath = (paths) => {
		paths = paths.map(item => item?.path);
		for (let i = 0; i < paths.length; i++) {
			if (paths[i] == pathname) {
				return true;
			}
		}
		return false;
	}

	return (
		content.map(item => {
			if (item.isPath) {
				return (
					<SidebarButton key={v4()} to={item.path} active={pathname}>{item.show}</SidebarButton>
				);
			} else {
				return (
					<SidebarDropdown text={item.text} key={v4()} isOpen={checkDropdownPath(item.paths)}>
						<SidebarContent content={item.paths} />
					</SidebarDropdown>
				)
			}
		})
	);
}

export default function Sidebar({ admin = false }) {
	let paths = [
		{
			isPath: true,
			show: 'Getting Started',
			path: '/'
		},
		{
			text: 'Graphics Objects',
			paths: [
				{
					isPath: true,
					show: 'Square',
					path: '/square'
				},
				{
					isPath: true,
					show: 'Circle',
					path: '/circle'
				},
				{
					isPath: true,
					show: 'Polygon',
					path: '/polygon'
				},
				{
					isPath: true,
					show: 'Line',
					path: '/line'
				},
			]
		}
	];

	if (admin) {
		paths.push({
			isPath: true,
			show: 'Add Info +',
			path: '/addinfo'
		})
	}

	const titleStyles = {
		padding: 15,
		color: 'white',
		paddingBottom: 0
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
			<hr />
			<SidebarContent content={paths} />
			{/* <SidebarDropdown text="Graphics Objects">
				<SidebarButton to="/square" active={pathname}>Square</SidebarButton>
				<SidebarButton to="/circle" active={pathname}>Circle</SidebarButton>
				<SidebarButton to="/polygon" active={pathname}>Polygon</SidebarButton>
				<SidebarButton to="/line" active={pathname}>Line</SidebarButton>
			</SidebarDropdown> */}
		</section>
	);
}