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

app.get('/product',(req,res)=>{
    res.send('This is product page')
    console.log('method:',req.method)
    console.log('params:',req.params.id)
    console.log('Query:',req.query)
    console.log('protocol:',req.protocol)
    console.log('ip:',req.ip)
    console.log('originalUrl:',req.originalUrl)
    console.log('path:',req.path)
})

app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`Server is listening at the port ${process.env.PORT}`)
})