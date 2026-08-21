import { Like } from "../models/like.model.js"

const findExistingLike=async(videoId,userId)=>{
  return Like.findOne({
        video:videoId, 
        likedBy:userId
    })
}

const  deleteExistingLike= async(likeId)=>{
     return Like.findByIdAndDelete(likeId)
}

const createLike= async(videoId,userId)=>{
 return await Like.create({
    video:videoId, 
    likedBy:userId
  })
}

export {findExistingLike,deleteExistingLike,createLike}