import express from 'express' 
import dotenv from 'dotenv' 
dotenv.config() 
const app=express() 

app.get('/',(req,res)=>{
    console.log('Hello from backend')
})

const port=process.env.PORT 
app.listen(port || 8000,()=>{
    console.log(`Server is running at the port:${port}`)
})
