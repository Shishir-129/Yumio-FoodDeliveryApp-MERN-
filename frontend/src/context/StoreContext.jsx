import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {  /* If item is not already in cart */
            setCartItems((prev) => ({...prev, [itemId]:1}));
        }
        else {  /* If item is already in cart */
            setCartItems((prev)=> ({...prev, [itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));
    }

    useEffect(() => {
        console.log(cartItems);
    }),[cartItems];

    const contextValue = {
        food_list, /* List of food items available in the store */
        cartItems, /* Current items in the cart */
        setCartItems, /* Function to update cart items */
        addToCart, /* Function to add an item to the cart */
        removeFromCart /* Function to remove an item from the cart */
    }
    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;