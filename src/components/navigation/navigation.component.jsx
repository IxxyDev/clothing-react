import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import './navigation.styles.scss';

const Navigation = () => {
	return (
		<>
			<nav className="navigation">
				<ul className="nav-links-container">
					<li>
						<Link className="nav-link" to="/">
							<CrownLogo className="logo"/>
						</Link>
					</li>
					<li>
						<Link className="nav-link" to="/shop">SHOP</Link>
					</li>
					<li>
						<Link className="nav-link" to="/sign-in">SIGN IN</Link>
					</li>
				</ul>
			</nav>
			<Outlet/>
		</>
	)
}

export default Navigation;