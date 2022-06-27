import homeStyles from '../../styles/Home.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import styles from '../../styles/addinfo.module.css';
import ActionBox from '../../components/admin/ActionBox';
import AdminSiteWrapper from '../../components/admin/AdminSiteWrapper';
import { getUser } from '../../tools/firebase';
import { useRouter } from 'next/router';

export default function Home() {
	const user = getUser();
	const router = useRouter();

	const handleCreateNewDocGroup = () => {
		router.push('/admin/creategroup');
	}

	const handleCreateObjectDoc = () => {
		router.push('/admin/createdoc');
	}

	return (
		<AdminSiteWrapper>
			<div className={homeStyles.container}>
				<Sidebar admin />
				<div className={homeStyles.full}>
					<Header user={user} userLoading={false} />
					<div className={styles.actionBoxes}>
						<ActionBox
							title="Create New Doc Group"
							desc="Creates a dropdown for grouping similar elements"
							action={handleCreateNewDocGroup}
						/>
						<ActionBox
							title="Create Object Doc"
							desc="Creates a new documentation tab for an object"
							action={handleCreateObjectDoc}
						/>
					</div>
				</div>
			</div>
		</AdminSiteWrapper>
	);
}