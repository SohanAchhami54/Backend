import { createSubscription, findChannel, findExistingSubscription } from "../services/subscription.js"
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { Asyncerror } from "../utils/Asyncerror.js"

const subscribeChannel = Asyncerror(async(req,res)=>{
    const {username} = req.params 
    if(!username) throw new Apierror(409,'Username not found')
    
    const channel = await findChannel(username) 
    if(!channel) throw new Apierror(409,'Channel not found') 

    //cannot subscribe our own channel. 
    if(channel._id===req.user._id) {
        throw new Apierror(400,'Your cannot subscribe to your own channel')
    }

    //check if already subscribe 
    const existingSubscription = await findExistingSubscription(req.user._id,channel._id) 
    if(existingSubscription) throw new Apierror(400,'User already subscribe this channel') 

    //create subscription 
    const subscriber = await createSubscription(req.user._id,channel._id) 
    if(!subscriber) throw new Apierror(400,'Cannot Subscribe to this channel')

    return res.status(200)
    .json(
        new Apiresponse(200,{},'Subscribed to this channel')
    )
})
export {subscribeChannel}