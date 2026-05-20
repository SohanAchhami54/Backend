import express from 'express'
import dotenv from 'dotenv' 
import cors from 'cors' 
import cookieparser from 'cookie-parser'
import { connectDatabase } from './db/index.js'
dotenv.config()
const app=express() 
const corsheader={
    origin:process.env.FRONTEND_URL, 
    method:['GET','PUT','POST','DELETE','PATCH'], 
    credentials:true
}
app.use(cors(corsheader)) 
app.use(cookieparser())
// app.use(express.json()) 
// app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('Hello from backend')  
})

const port=process.env.PORT 
connectDatabase()
.then(()=>{
  app.listen(port||8000,()=>{
    console.log(`Server is running in the port:${port}`)
})
})
.catch((error)=>{
    console.log('Mongodb connection failed',error)
})

