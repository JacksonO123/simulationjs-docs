import styles from '../../styles/Sidebar.module.css';
import SidebarItem from './SidebarItem';
import SidebarDropdown from './SidebarDropdown';
import SidebarButton from './SidebarButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import { getTabs } from '../../tools/firebase';

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
					<SidebarDropdown text={item.show} key={v4()} isOpen={checkDropdownPath(item.paths)}>
						<SidebarContent content={item.paths} />
					</SidebarDropdown>
				)
			}
		})
	);
}

export default function Sidebar({ admin = false }) {
	const startPaths = [
		{
			isPath: true,
			show: 'Getting Started',
			path: '/'
		},
	];
	const [paths, setPaths] = useState([...startPaths]);

	const checkAddAdmin = () => {
		if (admin) {
			setPaths(prev => {
				const obj = {
					isPath: true,
					show: 'Add Info +',
					path: '/admin/addinfo'
				}
				if (!prev.includes(obj)) {
					return [...prev, obj];
				}
				return prev;
			});
		}
	}

	useEffect(() => {
		(async () => {
			const tabs = await getTabs();
			await setPaths([...startPaths, ...tabs]);
			checkAddAdmin();
		})();
	}, []);

	useEffect(() => {
		checkAddAdmin();
	}, [admin]);

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
		</section>
	);
}