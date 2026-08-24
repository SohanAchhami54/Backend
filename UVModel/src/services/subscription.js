import { Subscription } from "../models/subscription.model.js"
import { User } from "../models/user.model.js"

const findSubscription=async(channelId,userId)=>{
   return Subscription.findOne({
     channel:channelId,
      subscriber:userId
   })
}

const deletedSubscription=async(channelId)=>{
  return Subscription.findByIdAndDelete(channelId)
}


const createSubscription=async(subscriber, channel)=>{
   return await Subscription.create({
     subscriber, 
     channel
   })
}

export {
    findSubscription,
    deletedSubscription,
    createSubscription
}