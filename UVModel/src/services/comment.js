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

const findCommentById = async(commentId)=>{
  return Comment.findById(commentId)
}

const updatedComment = async(commentId, content)=>{
    return Comment.findByIdAndUpdate(commentId,{
        $set:{content}
    },
    {returnDocument:'after'}
)
}

export {findallcommentforvideo,commentAddedtoVideo,findCommentById,updatedComment}
