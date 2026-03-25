import express from 'express' 
import dotenv from 'dotenv'
dotenv.config()
const app=express() 
app.get('/',(req,res)=>{
    res.send('Hello this is from backend')
})
app.get('/facebook',(req,res)=>{
    res.send('This is facebook page')
})

app.get('/twitter',(req,res)=>{
    res.send('This is twitter')
   
})

app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`Server is listening at the port ${process.env.PORT}`)
})