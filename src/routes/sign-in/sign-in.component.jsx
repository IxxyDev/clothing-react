import {
	createUserDocumentFromAuth,
	signInWithGoogle,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGoogle();
		const userDocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<>
			<h1>SignIn</h1>
			<button onClick={logGoogleUser}>Log in with Google</button>
		</>
	);
}

export default SignIn;