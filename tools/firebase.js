import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	getDoc,
	doc,
	getDocs,
	collection
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
		tabs.push(tab.data());
	});
	return tabs;
}

export const getUser = () => {
	return auth.currentUser;
}