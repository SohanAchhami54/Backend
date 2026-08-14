import dotenv from 'dotenv' 
import { app } from './app.js'
import prisma from './db/supabase.js'
dotenv.config() 

const port= process.env.PORT || 3002 
prisma.$connect()
.then(()=>{ 
  console.log('Database is Connected:')
  app.listen(port,()=>{
    console.log(`Server is running at the port:${port}`)
})
})
.catch((error)=>{
   console.log('Database connection failed',error)
})
