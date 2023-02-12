import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import './navigation.styles';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpened } = useContext(CartContext);
	return (
		<>
			<NavigationContainer>
				<NavLinks>
					<li>
						<LogoContainer to="/">
							<CrownLogo className="logo"/>
						</LogoContainer>
					</li>
					<li>
						<NavLink to="/shop">SHOP</NavLink>
					</li>
					{
						currentUser ? (
								<li>
									<NavLink onClick={signOutUser} as='span'>SIGN OUT</NavLink>
								</li>
							) :
							<li>
								<NavLink to="/auth">SIGN IN</NavLink>
							</li>
					}
					<CartIcon/>
				</NavLinks>
				{isCartOpened && <CartDropdown/>}
			</NavigationContainer>
			<Outlet/>
		</>
	)
}

export default Navigation;