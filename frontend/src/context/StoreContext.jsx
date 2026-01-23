/* Context provider for managing cart state including food items and cart functionality */

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

    const getTotalCartAmount = ()=> {
        let totalAmount = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item); /* Find item details from food_list */
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list, /* List of food items available in the store */
        cartItems, /* Current items in the cart */
        setCartItems, /* Function to update cart items */
        addToCart, /* Function to add an item to the cart */
        removeFromCart, /* Function to remove an item from the cart */
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;