import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import './navigation.styles.scss';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CardDropdown from "../cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpened } = useContext(CartContext);
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
					{
						currentUser ? (
								<li>
									<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
								</li>
							) :
							<li>
								<Link className="nav-link" to="/auth">SIGN IN</Link>
							</li>
					}
					<CartIcon/>
				</ul>
				{isCartOpened && <CardDropdown/>}
			</nav>
			<Outlet/>
		</>
	)
}

export default Navigation;