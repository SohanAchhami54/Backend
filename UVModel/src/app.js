import express from 'express' 
import dotenv from 'dotenv' 
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from './db/mongodb.js'
dotenv.config() 
const app=express() 

const headers={
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE','PATCH'], 
    credentials:true
}
app.use(cors(headers))
app.use(cookieParser())
app.use(express.json({limit:'16KB'})) 
app.use(express.urlencoded({extended:true,limit:'32KB'}))
app.use(express.static('public'))
app.get('/',(req,res)=>{
    console.log('Hello from backend')
})

const port=process.env.PORT 
connectDb()
.then(()=>{
  app.listen(port || 8000,()=>{
    console.log(`Server is running at the port:${port}`)
})
})
.catch((error)=>{
    console.log('Error occured while running app',error)
})
