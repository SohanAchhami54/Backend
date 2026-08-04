import mongoose from 'mongoose'
import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])
// dns.setDefaultResultOrder('ipv4first');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL)
    console.log('MongoDB database is connected')
    return connect
  } catch (error) {
    console.log('Error occurred while connecting to MongoDB:', error)
    process.exit(1)
  }
}

export { connectDb }