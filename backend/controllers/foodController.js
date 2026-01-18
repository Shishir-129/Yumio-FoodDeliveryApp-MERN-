import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`; // getting filename from multer

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })


    // saving food item to database
    try {
        await food.save();
        res.json({success: true , message: "Food Item Added Successfully"});
    } catch (error) {
        console.log(error)
        res.json({success: false , message: "Error!"});
    }
    
}



export {addFood};