import { Comment } from "../models/comment.model.js"

const findallcommentforvideo =async(videoId,skip,limit)=>{
   return Comment.find({video:videoId})
   .skip(skip)
   .limit(limit)
   .sort({createdAt:-1})
}

const commentAddedtoVideo = async(content,videoId,user)=>{
   return await Comment.create({
    content,
    video:videoId, 
    owner:user
   })
}

export {findallcommentforvideo,commentAddedtoVideo}
