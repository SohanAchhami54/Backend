import { addTweet } from "../services/tweet.js";
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



export {createTweet}