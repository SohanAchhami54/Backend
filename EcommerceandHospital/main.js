import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app= express()
app.get('/',(req,res)=>{
    console.log('req.url:',req.url,'req.method:',req.method)
    res.send('Hello This is from backend')
})

app.listen(process.env.PORT||4233,()=>{
    console.log(`Server is running in the port:${process.env.PORT}`);
})

