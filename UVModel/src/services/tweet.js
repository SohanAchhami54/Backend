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


export {addTweet,getallusertweet}