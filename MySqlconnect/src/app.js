import express from 'express' 
import dotenv from 'dotenv' 
dotenv.config() 
import cors from 'cors'
import cookieParser from 'cookie-parser' 
import userRouter from './routes/user.routes.js'
const app=express() 

const corsOptions={
    origin:[process.env.FRONTEND_URL],
    methods:['GET','PUT', 'PATCH', 'DELETE', 'POST'], 
    credentials:true, 
} 

app.use(cors(corsOptions)) 
app.use(cookieParser()) 
app.use(express.json({limit:'16KB'})) 
app.use(express.urlencoded({extended:true,limit:'32KB'}))  
app.use(express.static('public')) 
app.use('/api/v1/users',userRouter)

export default app 