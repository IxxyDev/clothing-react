import { ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import './cart-icon.styles';
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
	const { isCartOpened, setIsCartOpened, cartCount } = useContext(CartContext);

	const toggleIsCartOpened = () => setIsCartOpened(!isCartOpened);

	return (
		<CartIconContainer>
			<ShoppingIcon onClick={toggleIsCartOpened}/>
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	)
}

export default CartIcon;