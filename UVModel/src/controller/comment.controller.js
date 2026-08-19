import { commentAddedtoVideo, findallcommentforvideo, findCommentById, updatedComment } from "../services/comment.js"
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { Asyncerror } from "../utils/Asyncerror.js"

const  getVideoComments = Asyncerror(async(req,res)=>{
    const {videoId} = req.params  
    const {page=1, limit=10} = req.query 
    
    const skip = (Number(page)-1) * Number(limit) 

    const allcomments = await findallcommentforvideo(videoId,skip,Number(limit))
   
    return res.status(200)
    .json(
        new Apiresponse(200,allcomments,'Fetch all comments successfully')
    )
})


const addComment = Asyncerror(async(req,res)=>{
    const {content} = req.body 
    if(!content?.trim()) throw new Apierror(400,'Comment not found') 

    const user = req.user._id

    const {videoId} = req.params 
    if(!videoId) throw new Apierror(400,'VideoId not found') 

    const addCommenttovideo = await commentAddedtoVideo(content,videoId,user) 
    if(!addCommenttovideo) throw new Apierror(400,'Comment not added to video') 

    return res.status(200)
    .json(
        new Apiresponse(201,addCommenttovideo,'Comment added successfully to video')
    )
})

const updateCommentcontent = Asyncerror(async(req,res)=>{ 
    const {commentId} = req.params 
    if(!commentId) throw new Apierror(400,'Commentid do not found') 
    
    const {content} = req.body
    if(!content) throw new Apierror(400,'Comment not found')

    const commentDetails = await findCommentById(commentId) 
    if(!commentDetails) throw new Apierror(400,'Comment Details not found')
   
    if(req.user._id.toString()!==commentDetails.owner.toString()){
        throw new Apierror(400,'Unauthorized to update comment')
    }

    const commentupdate = await updatedComment(commentId, content)
    if(!commentupdate) throw new Apierror(400,'Comment content is not updated') 

    return res.status(200)
    .json(
        new Apiresponse(200,commentupdate,'Comment update successfully')
    )
})

export {getVideoComments,addComment,updateCommentcontent}