import { Tweet } from "../models/tweet.model.js"

const addTweet = async(content,owner)=>{
   return Tweet.create({
    content,
    owner
  })
}


export {addTweet}