import express from 'express' 
import dotenv from 'dotenv' 
import cookieParser from 'cookie-parser'
dotenv.config() 
const app=express() 

const headers={
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE','PATCH'], 
    credentials:true
}
app.use(cookieParser(headers))

app.get('/',(req,res)=>{
    console.log('Hello from backend')
})

const port=process.env.PORT 
app.listen(port || 8000,()=>{
    console.log(`Server is running at the port:${port}`)
})
