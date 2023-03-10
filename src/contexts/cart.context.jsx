import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(item => item.id === productToAdd.id)

	if (existingCartItem) {
		return cartItems.map(item => {
			return item.id === productToAdd.id
				? { ...item, quantity: item.quantity++ }
				: item
		})
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
	}

	return cartItems.map(item => {
		return item.id === cartItemToRemove.id
			? { ...item, quantity: item.quantity-- }
			: item
	})
}

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
	isCartOpened: false,
	setIsCartOpened: () => {
	},
	cartItems: [],
	addItemToCart: () => {
	},
	removeItemFromCart: () => {
	},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0
})

export const CartProvider = ({ children }) => {
	const [isCartOpened, setIsCartOpened] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal= cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd))
	}

	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove))
	}

	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItems, cartItemToClear))
	}

	const value = { isCartOpened, setIsCartOpened, addItemToCart, cartItems, cartTotal, cartCount, removeItemFromCart, clearItemFromCart };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}