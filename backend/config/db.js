// logic for connecting with the databse

import mongoose from "mongoose";


// export is used to use this function in other files
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yumio:qwerty12345@cluster0.pptmjxp.mongodb.net/Yumio').then(()=>console.log("DB Connected"));
}