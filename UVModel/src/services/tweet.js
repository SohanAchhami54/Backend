import { Tweet } from "../models/tweet.model.js"

const addTweet = async(content,owner)=>{
   return Tweet.create({
    content,
    owner
  })
}

const getallusertweet = async(owner)=>{
    return Tweet.find({owner})
}

const findOldTweet = async(tweetid)=>{
  return Tweet.findById(tweetid)
}

const updatedTweet= async(tweetId,content)=>{
  return Tweet.findByIdAndUpdate(tweetId,{
    $set:{content}
   },
   {returnDocument:'after'}
)
}


const findTweetDetails=async(tweetId)=>{
   return Tweet.findById(tweetId)
}

const deletedTweet=async(tweetId)=>{
   return Tweet.findByIdAndDelete(tweetId)
}

export {
    addTweet,
    getallusertweet,
    findOldTweet,
    updatedTweet,
    findTweetDetails,
    deletedTweet
}