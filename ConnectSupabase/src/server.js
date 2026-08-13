import dotenv from 'dotenv' 
import { app } from './app.js'
dotenv.config() 
const PORT=process.env.PORT || 3002 

app.listen(PORT,()=>{
    console.log(`Server is running at the port:${PORT}`)
})