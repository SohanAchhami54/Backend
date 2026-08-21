import { createCommentLike, createVideoLike, deleteExistingCommentLike, deleteExistingVideoLike, findExistingCommentLike, findExistingVideoLike } from "../services/like.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Asyncerror } from "../utils/Asyncerror.js";

const toggleVideoLike = Asyncerror(async(req,res)=>{
    const {videoId} = req.params 
    if(!videoId) throw new Apierror(400,'Video id not found') 
    
    const existingVideoLike = await findExistingVideoLike(videoId,req.user._id) 
    if(existingVideoLike){
        await deleteExistingVideoLike(existingVideoLike._id)
        return res.status(200)
        .json(
            new Apiresponse(200,{},'Video like delete successfully')
        ) 
    }

    const videolike = await createVideoLike(videoId,req.user._id) 
    if(!videolike) throw new Apierror(400,'Like not created') 

    return res.status(200)
    .json(
        new Apierror(200,videolike,'Like created successfully')
    )
})

const toggleCommentLike = Asyncerror(async(req,res)=>{
    const {commentId} = req.params 
    if(!commentId) throw new Apierror(400,'CommentId do not found') 
    
    const existingCommentLike = await findExistingCommentLike(commentId,req.user._id) 
    if(existingCommentLike){
        await deleteExistingCommentLike(existingCommentLike._id) 
        return res.status(200)
        .json(
            new Apierror(200,{},'Comment like delete successfully')
        )
    }
    const commentlike =  await createCommentLike(commentId, req.user._id) 
    if(!commentlike) throw new Apierror(400,'Comment like do not created') 
    
    return res.status(200)
    .json(
        new Apiresponse(200,commentlike,'Comment like successfully created.')
    )
})



export {
    toggleVideoLike,
    toggleCommentLike,

}