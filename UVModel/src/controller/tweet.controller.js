import { addTweet, deletedTweet, findOldTweet, findTweetDetails, getallusertweet, updatedTweet } from "../services/tweet.js";
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


const updateTweet = Asyncerror(async(req,res)=>{
    const {tweetId} = req.params 
    if(!tweetId) throw new Apierror(400,'Tweet id do not found')

    const {content} = req.body 
    if(!content) throw new Apierror(400,'Content do not found') 
    
    const oldtweet = await findOldTweet(tweetId) 
    if(!oldtweet) throw new Apierror(400,'Old tweet not found') 
    
    if(req.user._id.toString()!==oldtweet.owner.toString()){
        throw new Apierror(400,'Unauthorized to update tweet')
    }

    const updatetweet = await updatedTweet(tweetId,content) 
    if(!updatetweet) throw new Apierror(400,'Tweet do not updated') 
    
    return res.status(200)
    .json(
        new Apiresponse(200,updatetweet,'Tweet updated successfully')
    )
})


const deleteTweet = Asyncerror(async(req,res)=>{
    const {tweetId} = req.params 
    if(!tweetId) throw new Apierror(400,'Tweet id do not found') 
 
    const tweetDetails = await findTweetDetails(tweetId) 
    if(!tweetDetails) throw new Apierror(400,'Tweet details do not found') 
    
    if(req.user._id.toString()!==tweetDetails.owner.toString()){
        throw new Apierror(400,'Unauthorized to delete tweet')
    }
    
    const tweet = await deletedTweet(tweetId)  
    if(!tweet) throw new Apierror(400,'Tweet do not deleted') 
    
    return res.status(200)
    .json(
        new Apiresponse(200,{},'Tweet deleted successfully')
    )
})

export {createTweet,getUserTweets,updateTweet,deleteTweet}