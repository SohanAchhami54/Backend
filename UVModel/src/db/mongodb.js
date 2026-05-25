import mongoose from 'mongoose' 

const connectDb=async()=>{
  try {
    const connect=await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log('MongoDb database is connected')
    return connect
  } catch (error) {
    console.log('Error occur while connecting to mongodb',error) 
    process.exit(1)
  }
}

export {connectDb}