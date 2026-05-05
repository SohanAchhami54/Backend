import mongoose from 'mongoose' 
import { DB_NAME } from '../constants.js' 

const connectDB=async()=>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log('mongodb database is connected')
       console.log(`connection instances is: ${connectionInstance.connection.host} `)
    } catch (error) {
        console.log('Error occured while connecting to database:',error) 
        process.exit(1)
    }
}
export {connectDB}

