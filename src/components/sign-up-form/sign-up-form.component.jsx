import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import 'sign-up-form.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}
const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = event => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				console.error("Email already in use ", error)
			} else {
				console.error(error);
			}
		}
	}

	return (
		<div className="sign-up-container">
			<h2>Dont' have an account</h2>
			<span>Sign up with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput type="email" required name="email" onChange={handleChange} value={email} label="Email"/>
				<FormInput type="password" required name="password" onChange={handleChange} value={password} label="Password"/>
				<FormInput type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword}
				           label="Confirm Password"/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	)
}

export default SignUpForm;