import userModel from '../models/userModel.js';

// add items to user cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // find user by ID
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {  /* If item is not already in cart */
            cartData[req.body.itemId] = 1; // add item with quantity 1
        } else {
            cartData[req.body.itemId] += 1; // increment item quantity by 1
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData}); // update user cart data in database
        res.json({success:true,message:"Item added to cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // find user by ID
        let cartData = await userData.cartData; // await pauses the function named removeFromCart until the promise is resolved and returns the result

        if (cartData[req.body.itemId] > 0) { /* If item quantity is greater than 0 */
            cartData[req.body.itemId] -= 1; // decrement item quantity by 1
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData}); // update user cart data in database
        res.json({success:true,message:"Item removed from cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// fetch user cart data
const getCart = async (req,res) => { // we will get the userId from the auth middleware (token)
    try {
        let userData = await userModel.findById(req.body.userId); // find user by ID
        let cartData = await userData.cartData; // get user cart data
        res.json({success:true,cartData}); // send cart data as response
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart,removeFromCart,getCart};