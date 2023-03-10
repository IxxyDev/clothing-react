import SignUpForm from "../../components/sign-in-form/sign-in-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss';

const Authentication = () => {
	return (
		<div className="authentication-container">
			<h1>SignIn</h1>
			<SignInForm />
			<SignUpForm />
		</div>
	);
}

export default Authentication;