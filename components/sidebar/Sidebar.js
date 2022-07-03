import styles from '../../styles/Sidebar.module.css';
import SidebarItem from './SidebarItem';
import SidebarDropdown from './SidebarDropdown';
import SidebarButton from './SidebarButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import { getTabs, deleteTabFromDropdown, renameDoc } from '../../tools/firebase';

const SidebarContent = ({ content, admin, fetchTabs, parent }) => {

	const [pathname, setPathname] = useState('');
	const router = useRouter();

	useEffect(() => {
		const currentPath = router.asPath;
		setPathname(currentPath);
	}, [router]);

	const checkDropdownPath = (paths) => {
		paths = paths.map(item => item?.path);
		return paths.includes(pathname);
	};

	const handleRemoveTab = async tab => {
		await deleteTabFromDropdown(parent.show, tab.path)
		fetchTabs();
	};

	const handleUpdateItem = async (prevName, newName) => {
		await renameDoc(prevName, newName, parent.show);
		fetchTabs();
	};

	return (
		content.map(item => {
			if (item.isPath) {
				return (
					<SidebarButton
						key={v4()}
						to={item.path}
						active={pathname}
						admin={admin && !item.perminant}
						handleDeleteDoc={() => handleRemoveTab(item)}
						updateItem={e => handleUpdateItem(item.show, e)}
						editable={item.show}
					>
						{item.show}
					</SidebarButton>
				);
			} else {
				return (
					<SidebarDropdown
						text={item.show}
						key={v4()}
						isOpen={checkDropdownPath(item.paths)}
						admin={admin && !item.perminant}
						fetchTabs={fetchTabs}
					>
						<SidebarContent
							content={item.paths}
							admin={admin}
							fetchTabs={fetchTabs}
							parent={item}
						/>
					</SidebarDropdown>
				);
			}
		})
	);
};

export default function Sidebar({ admin = false }) {
	const startPaths = [
		{
			isPath: true,
			perminant: true,
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
					perminant: true,
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

	const fetchTabs = async () => {
		const tabs = await getTabs();
		await setPaths([...startPaths, ...tabs]);
		checkAddAdmin();
	}

	useEffect(() => {
		fetchTabs();
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
			<SidebarContent content={paths} admin={admin} fetchTabs={fetchTabs} parent={null} />
		</section>
	);
}