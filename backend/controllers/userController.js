// this file contains controller functions for user authentication (login and registration)

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// login user api
const loginUser = async (req,res) => {
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email}); // finding user by email

        if(!user) {
            return res.json({success:false,message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password); // comparing entered password with the stored password in database

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"});
        }

        const token = createToken(user._id); // creating token for user
        res.json({success:true,token});
    }catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// token is used to verify user identity and provide access to protected routes
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET) // creating token using jwt and returning it
}

// register user api
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email !"})
        }

        if (password.length < 8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // before creating account , we will encrypt the password
        // hashing user password
        const salt = await bcrypt.genSalt(10); // ranges btwn 5 to 15 (easier to stronger hashing); if we keep 15 , it will take time to encrypt the password
        const hashedPassword = await bcrypt.hash(password,salt); // generating hashed password and saving it to hashedPassword variable

        // creating new user 
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save(); // saving user to database
        const token = createToken(user._id); // creating token for user
        res.json({success:true,token})

    } catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}