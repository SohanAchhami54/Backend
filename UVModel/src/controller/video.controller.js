import { createVideo } from "../services/video.js"
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { Asyncerror } from "../utils/Asyncerror.js"
import { uploadonCloudinary, uploadVideoonCloudinary } from "../utils/cloudinary.js"

const videoUpload = Asyncerror(async(req,res)=>{ 
    const {title,description} = req.body 
    if(!title || !description){
        throw new Apierror(400,'All field are required')
    }
    const videofile = req.files?.videofile?.[0]?.path 
    const thumbnail = req.files?.thumbnail?.[0]?.path
    if(!videofile || !thumbnail) throw new Apierror(400,'Videofile do not found') 
    
    const videofileonCloudinary = await uploadVideoonCloudinary(videofile) 
    if(!videofileonCloudinary) throw new Apierror(400,'Video not upload on cloudinary')

    const thumbnailonCloudinary = await uploadonCloudinary(thumbnail)
    if(!thumbnailonCloudinary) throw new Apierror(400,'Thumbnail not upload on cloudinary')  
 

    const owner = req.user._id

    const video = await createVideo(videofileonCloudinary,thumbnailonCloudinary,owner,title,description) 

    if(!video) throw new Apierror(400,'Video is not created and uploaded')

    return res.status(200) 
    .json(
        new Apiresponse(200,video,'Video is upload on cloudinary')
    )
})


// const updateThumbnail =Asyncerror(async(req,res)=>{
//     const user = req.user._id  
    
// })


export {videoUpload,updateThumbnail}