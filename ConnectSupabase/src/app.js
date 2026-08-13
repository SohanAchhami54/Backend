import express from 'express' 
import dotenv from 'dotenv' 
dotenv.config() 
import cookieParser from 'cookie-parser' 
const app=express() 

const corsOptions={
    origin:[process.env.FRONTEND_URL],
    methods:['GET','PATCH','PUT','DELETE','POST'],
    credentials:true
}

app.use(cors(corsOptions()))
app.use(cookieParser()) 
app.use(express.json({limit:'16KB'})) 
app.use(express.urlencoded({extended:true,limit:'32KB'})) 
app.use(express.static('public')) 

export {app}