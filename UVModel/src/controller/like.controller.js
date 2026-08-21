import { createLike, deleteExistingLike, findExistingLike } from "../services/like.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Asyncerror } from "../utils/Asyncerror.js";

const toggleVideoLike = Asyncerror(async(req,res)=>{
    const {videoId} = req.params 
    if(!videoId) throw new Apierror(400,'Video id not found') 
    
    const existingLike = await findExistingLike(videoId,req.user._id) 
    if(existingLike){
        await deleteExistingLike(existingLike._id)
        return res.status(200)
        .json(
            new Apiresponse(200,{},'Video like delete successfully')
        ) 
    }

    const like = await createLike(videoId,req.user._id) 
    if(!like) throw new Apierror(400,'Like not created') 

    return res.status(200)
    .json(
        new Apierror(200,like,'Like created successfully')
    )
})


export {
    toggleVideoLike,

}