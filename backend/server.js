import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import dotenv from 'dotenv';
dotenv.config();

//app config

const app=express()
const port=process.env.PORT||4000;
//DB connection
connectDB()
// middleware

app.use(express.json())
app.use(cors())

//api end points
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)



app.get('/',(req,res)=>{
    res.send(`Api is working`)
})
app.listen(port,()=>{console.log(`listening at the http://localhost:${port}`)})

