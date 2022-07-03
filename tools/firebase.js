import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	getDoc,
	doc,
	getDocs,
	collection,
	setDoc,
	deleteDoc
} from 'firebase/firestore';
import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	GoogleAuthProvider,
	signInWithRedirect
} from 'firebase/auth';

const config = {
	apiKey: "AIzaSyAv8x1kppqKEFtYTcVeBtJYuqHUIeV_DQo",
	authDomain: "simulation-js-so.firebaseapp.com",
	projectId: "simulation-js-so",
	storageBucket: "simulation-js-so.appspot.com",
	messagingSenderId: "257519458988",
	appId: "1:257519458988:web:0f7649797ac176e1755d09",
	measurementId: "G-EYLH3530ZY"
}

const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app);

export const signIn = async () => {
	await setPersistence(auth, inMemoryPersistence).then(() => {
		const provider = new GoogleAuthProvider();
		return signInWithRedirect(auth, provider);
	});
};

export const signOut = () => {
	auth.signOut();
};

export const getAuthObject = () => {
	return auth;
};

export const checkIsAdmin = async (user) => {
	const admins = await getDoc(doc(db, 'admins', 'uids'));
	const uids = admins.data().uids;
	return uids.includes(user.uid);
};

export const getTabs = async () => {
	const dbTabs = await getDocs(collection(db, 'tabs'));
	let tabs = [];
	dbTabs.forEach(tab => {
		const obj = tab.data();
		// obj.name = tab.id.replace(/\-/g, ' ');
		tabs.push(obj);
	});
	return tabs;
};

export const getUser = () => {
	return auth.currentUser;
};

const filterPaths = paths => {
	let copy = [...paths];
	let contained = [];
	let newPaths = [];
	for (let i = 0; i < copy.length; i++) {
		if (!contained.includes(copy[i].path)) {
			contained.push(copy[i].path);
			newPaths.push(copy[i]);
		}
	}
	return newPaths;
};

const parseToDocString = val => {
	return val.replace(/\s/g, '-');
}

const parseToPaths = (name, paths) => {
	let newPaths = paths.map(path => {
		const obj = {
			isPath: true,
			show: path.name,
			path: `/${path.path}`
		}
		return obj;
	});
	newPaths = filterPaths(newPaths);
	const obj = {
		show: name,
		paths: newPaths
	}
	return obj;
};

export const createGroup = async (name, docs, fromInputs = false) => {
	const tabDocs = await getDocs(collection(db, 'tabs'));
	let tabs = [];
	tabDocs.forEach(tab => {
		tabs.push(tab);
	});
	const newName = parseToDocString(name);
	const newPaths = fromInputs ? parseToPaths(name, docs) : docs;
	await setDoc(doc(db, 'tabs', newName), newPaths);
};

export const getGroup = async name => {
	const groupDoc = await getDoc(doc(db, 'tabs', parseToDocString(name)));
	if (groupDoc.exists()) {
		const data = groupDoc.data();
		return data;
	} else return null;
};

export const deleteTabFromDropdown = async (dropdownName, path) => {
	const name = dropdownName.replace(/\s/g, '-');
	let group = await getDoc(doc(db, 'tabs', name));
	group = group.data();
	group.paths.splice(group.paths.find(el => el.path == path), 1);
	await setDoc(doc(db, 'tabs', name), group);
};

export const deleteGroup = async name => {
	name = parseToDocString(name);
	await deleteDoc(doc(db, 'tabs', name));
};

export const getPage = async dir => {
	if (dir[0] == '/')
		dir = dir.substring(1);
	const page = await getDoc(doc(db, 'pages', dir));
	if (!page.exists()) return null;
	return page;
};

export const renameGroup = async (prevName, newName) => {
	if (prevName === newName) return;
	const groupDoc = await getGroup(prevName);
	groupDoc.show = newName;
	await createGroup(newName, groupDoc);
	await deleteGroup(prevName);
};

export const renameDoc = async (prevName, newName, parentName) => {
	const groupDoc = await getGroup(parentName);
	groupDoc.paths = groupDoc.paths.map(path => {
		if (path.show === prevName) {
			path.show = newName;
			return path;
		}
		return path;
	});
	await setDoc(doc(db, 'tabs', parseToDocString(parentName)), groupDoc);
};