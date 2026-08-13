import dotenv from 'dotenv' 
import app from './app.js'
import { connection } from './db/mysql.js'

dotenv.config() 
const PORT=process.env.PORT || 3002

connection()
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running at the port:${PORT}`)
})
})
.catch((error)=>{
  console.error('Error Starting Server:',error)
})
