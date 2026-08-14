import express from 'express' 
import dotenv from 'dotenv'
dotenv.config() 
import cors from 'cors' 
import cookieParser from 'cookie-parser' 
import { errorMiddleware } from './middleware/error.middleware.js'
import userRouter from './routes/user.routes.js'
const app=express() 

const corsOptions={
    origin:[process.env.FRONTEND_URL], 
    methods:['GET','POST','PATCH','DELETE','PUT'],
    credentials:true
}

app.use(cors(corsOptions)) 
app.use(express.json({limit:'16KB'})) 
app.use(express.urlencoded({extended:true,limit:'32KB'})) 
app.use(express.static('public')) 

app.use('/api/v1/users',userRouter)

app.use(errorMiddleware)

export {app}