import { addTweet, getallusertweet } from "../services/tweet.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Asyncerror } from "../utils/Asyncerror.js";

const createTweet = Asyncerror(async(req,res)=>{
    const {content} = req.body 
    if(!content) throw new Apierror(400,'Tweet do not found') 
    
    const tweet = await addTweet(content,req.user._id) 
    if(!tweet) throw new Apierror(400,'Tweet not created') 

    return res.status(200)
    .json(
        new Apiresponse(200,tweet,'Tweet created successfully')
    )
})

const getUserTweets = Asyncerror(async(req,res)=>{ 
    const userId = req.user._id 
    if(!userId) throw new Apierror(400,'User id do not found') 
    
    const alltweet = await getallusertweet(req.user._id)  
    if(alltweet.length===0) throw new Apierror(400,'User tweet do not found') 
    
    return res.status(200)
    .json(
        new Apiresponse(200,alltweet,'All user tweet found')
    )
})



export {createTweet,getUserTweets}