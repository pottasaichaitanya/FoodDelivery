import mongoose from "mongoose";
export const connectDB=async()=>{
    (await mongoose.connect('mongodb://localhost:27017/food-del')
    .then(()=>console.log('db is connceted')
    ))
}