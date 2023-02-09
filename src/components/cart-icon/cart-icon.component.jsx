import { ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import './cart-icon.styles.scss';
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
	const { isCartOpened, setIsCartOpened, cartCount } = useContext(CartContext);

	const toggleIsCartOpened = () => setIsCartOpened(!isCartOpened);

	return (
		<div className="cart-icon-container">
			<ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpened}/>
			<span className="item-count">{cartCount}</span>
		</div>
	)
}

export default CartIcon;