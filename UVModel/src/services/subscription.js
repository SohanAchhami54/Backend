import { Subscription } from "../models/subscription.model.js"
import { User } from "../models/user.model.js"

const findSubscription=async(channelId,userId)=>{
   return Subscription.findOne({
     channel:channelId,
     subscription:userId
   })
}

const deletedSubscription=async(channelId)=>{
  return Subscription.findByIdAndDelete(channelId)
}


const createSubscription=async(subscribe, channel)=>{
   return await Subscription.create({
     subscribe, 
     channel
   })
}

export {
    findSubscription,
    deletedSubscription,
    createSubscription
}