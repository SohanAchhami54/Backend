import mongoose, { mongo }  from "mongoose" 
import { DB_NAME } from "../constant.js" 

const connectDatabase=async()=>{
    try{
        const mongooseconnect= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) 
        console.log('Mongodb connected')
    }catch(error){
        console.log('Error occur in the database',error) 
        process.exit(1)
    }
}
export {connectDatabase}