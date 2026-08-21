import { Like } from "../models/like.model.js"

const findExistingVideoLike=async(videoId,userId)=>{
  return Like.findOne({
        video:videoId, 
        likedBy:userId
    })
}

const  deleteExistingVideoLike= async(likeId)=>{
     return Like.findByIdAndDelete(likeId)
}

const createVideoLike= async(videoId,userId)=>{
 return await Like.create({
    video:videoId, 
    likedBy:userId
  })
}

const findExistingCommentLike =async(commentId,userId)=>{
   return Like.findOne({
     comment:commentId, 
     likedBy:userId
   })
}

const deleteExistingCommentLike= async(likeId)=>{
   return Like.findByIdAndDelete(likeId)
}

const createCommentLike = async(commentId,userId)=>{
   return await Like.create({
        comment:commentId, 
        likedBy:userId
    })
}

export {
    findExistingVideoLike,
    deleteExistingVideoLike,
    createVideoLike,
    findExistingCommentLike,
    deleteExistingCommentLike,
    createCommentLike
}