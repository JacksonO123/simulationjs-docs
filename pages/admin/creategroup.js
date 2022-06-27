import AdminSiteWrapper from '../../components/admin/AdminSiteWrapper';
import homeStyles from '../../styles/Home.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import styles from '../../styles/creategroup.module.css';
import Input from '../../components/Input';
import { getAuthObject } from '../../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import DocInput from '../../components/DocInput';
import { v4 } from 'uuid';

export default function Home() {
	const auth = getAuthObject();
	const [user, loading, error] = useAuthState(auth);
	const [groupName, setGroupName] = useState('');
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		console.log(groupName);
	}, [groupName]);

	const handleAddNewDoc = () => {
		setDocs(prev => {
			const obj = {
				name: '',
				path: '',
				desc: '',
				attr: [],
				mode: 'mut'
			}
			return [...prev, obj];
		});
	}

	const setDoc = (doc, index) => {
		setDocs(prev => {
			const newDocs = prev.map((d, i) => {
				if (index == i) {
					return Object.assign({}, doc);
				} else return d;
			});
			console.log(newDocs);
			return newDocs;
		})
	}

	const deleteDoc = index => {
		setDocs(prev => {
			return prev.filter((_, i) => index != i);
		})
	}

	return (
		<AdminSiteWrapper>
			<div className={homeStyles.container}>
				<Sidebar admin />
				<div className={homeStyles.full}>
					<Header user={user} userLoading={loading} />
					<div className={styles.formWrapper}>
						<Input placeholder="Group Name" onChange={e => setGroupName(e.target.value)} sx={{ width: 350 }} />
						{docs.length > 0 && (
							<div className={styles.docInputs}>
								{docs.map((doc, index) => (
									<DocInput
										key={v4()}
										saveDoc={doc => setDoc(doc, index)}
										deleteDoc={() => deleteDoc(index)}
										initialMode={doc.mode}
										initialName={doc.name}
										initialPath={doc.path}
										initialDesc={doc.desc}
										initialAttr={doc.attr}
									/>
								))}
							</div>
						)}
						<Button onClick={handleAddNewDoc}>Add New Doc +</Button>
						<Button>Submit</Button>
					</div>
				</div>
			</div>
		</AdminSiteWrapper>
	);
}