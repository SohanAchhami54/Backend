import { app } from "./app.js";
import { sequelize } from "./db/database.js";
import dotenv from 'dotenv' 

const PORT=process.env.PORT || 3002

sequelize.authenticate()
.then(()=>{
    console.log('Connected to PostgreSQL')
    app.listen(PORT,()=>{
       console.log('Server is running at the port:',PORT)
    })
    
})
.catch((error)=>{
    console.error('Error occur while connecting to postgresql:',error)
    process.exit(1)
})