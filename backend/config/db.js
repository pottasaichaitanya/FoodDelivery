import mongoose from "mongoose";
export const connectDB=async()=>{
    (await mongoose.connect('mongodb+srv://saichaitanyapotta21:12345@cluster0.ioistee.mongodb.net/food-del')
    .then(()=>console.log('db is connceted')
    ))
}