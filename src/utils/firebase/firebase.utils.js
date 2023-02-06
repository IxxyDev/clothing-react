import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyAJVMosE4-aB7FFoOOYbTFtm4L69NfZ9us",
	authDomain: "clothing-db-4fef7.firebaseapp.com",
	projectId: "clothing-db-4fef7",
	storageBucket: "clothing-db-4fef7.appspot.com",
	messagingSenderId: "718051818256",
	appId: "1:718051818256:web:6f7f52cb6324d807f40395"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (userSnapshot.exists()) {
		return userDocRef;
	}

	const { displayName, email } = userAuth;
	const createdAt = new Date();

	try {
		await setDoc(userDocRef, {
			displayName,
			email,
			createdAt,
			...additionalInformation
		})
	} catch (error) {
		console.error('Error creating a user');
	}
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)