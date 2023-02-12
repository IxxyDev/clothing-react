import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = event => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					console.error("Wrong password ", error)
					break;
				case 'auth/user-not-found':
					console.error("User not found ", error);
					break;
				default:
					console.error(error);
			}
		}
	}

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput type="email" required name="email" onChange={handleChange} value={email} label="Email"/>
				<FormInput type="password" required name="password" onChange={handleChange} value={password} label="Password"/>
				<div className="button-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm;