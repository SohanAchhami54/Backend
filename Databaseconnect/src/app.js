import express from 'express' 
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
dotenv.config()
const app=express()

app.get('/',(req,res)=>{
    res.send('Backend is running successfully')
})

connectDB()
app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is running at the port ${process.env.PORT}`)
})
