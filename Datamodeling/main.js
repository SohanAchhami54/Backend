import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app=express()
app.get('/',(req,res)=>{
    return res.send('This is from backend and I am learning the backends');
})

app.listen(process.env.PORT||4000,(req,res)=>{
    console.log(`Server is running in the port:${process.env.PORT}`)
});