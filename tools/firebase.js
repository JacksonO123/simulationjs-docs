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
}

export const getAuthObject = () => {
	return auth;
}

export const checkIsAdmin = async (user) => {
	const admins = await getDoc(doc(db, 'admins', 'uids'));
	const uids = admins.data().uids;
	return uids.includes(user.uid);
}

export const getTabs = async () => {
	const dbTabs = await getDocs(collection(db, 'tabs'));
	let tabs = [];
	dbTabs.forEach(tab => {
		const obj = tab.data();
		// obj.name = tab.id.replace(/\-/g, ' ');
		tabs.push(obj);
	});
	return tabs;
}

export const getUser = () => {
	return auth.currentUser;
}

const parseToPaths = (name, paths) => {
	const newPaths = paths.map(path => {
		const obj = {
			isPath: true,
			show: path.name,
			path: `/${path.path}`
		}
		return obj;
	});
	const obj = {
		show: name,
		paths: newPaths
	}
	return obj;
}

export const createGroup = async (name, docs) => {
	const tabDocs = await getDocs(collection(db, 'tabs'));
	let tabs = [];
	tabDocs.forEach(tab => {
		tabs.push(tab);
	});
	const newName = name.replace(/\s/g, '-');
	const newPaths = parseToPaths(name, docs);
	await setDoc(doc(db, 'tabs', newName), newPaths);
}

export const deleteTabFromDropdown = async (dropdownName, path) => {
	const name = dropdownName.replace(/\s/g, '-');
	let group = await getDoc(doc(db, 'tabs', name));
	group = group.data();
	group.paths.splice(group.paths.find(el => el.path == path), 1);
	console.log(group);
	await setDoc(doc(db, 'tabs', name), group);
}

export const deleteDropdown = async (name) => {
	name = name.replace(/\s/g, '-');
	await deleteDoc(doc(db, 'tabs', name));
}