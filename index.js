const express=require('express');
const app=express();
require('dotenv').config();


app.get('/',(req,res)=>{
    res.send("Hello this is home page");
})

app.get('/login',(req,res)=>{
    res.send("This is login page");
})

app.get('/tiktok',(req,res)=>{
    res.send("This is tiktok page");
})

const port=process.env.PORT;
app.listen(port||4000,()=>{
    console.log(`The Server is running at the port:${port}`);
});