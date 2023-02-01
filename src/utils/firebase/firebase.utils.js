import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
			createdAt
		})
	} catch (error) {
		console.error('Error creating a user');
	}
}