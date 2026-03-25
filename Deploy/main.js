import express from 'express' 
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

const PORT=4000
app.listen(PORT,()=>{
    console.log(`Server is listening at the port ${PORT}`)
})