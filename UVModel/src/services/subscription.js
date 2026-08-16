import { Subscription } from "../models/subscription.model.js"
import { User } from "../models/user.model.js"

const findChannel=async(username)=>{
   return User.findOne({username})
}

const findExistingSubscription=async(subscribe, channel)=>{
    return Subscription.findOne({
        subscribe, 
        channel
    })
}

const createSubscription=async(subscribe, channel)=>{
   return await Subscription.create({
     subscribe, 
     channel
   })
}

export {findChannel,findExistingSubscription,createSubscription}