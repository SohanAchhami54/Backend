import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app=express()

app.get('/',(req,res)=>{
    res.send('Hello This is from backend')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at the port:${process.env.PORT}`)
})