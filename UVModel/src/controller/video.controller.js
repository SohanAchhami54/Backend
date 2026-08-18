import { allvideoByOwnerId, createVideo, findOwnerVideoDetails, findVideoById, updateVideoDetails,  } from "../services/video.js"
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { Asyncerror } from "../utils/Asyncerror.js"
import { deleteFromCloudinary, uploadonCloudinary, uploadVideoonCloudinary } from "../utils/cloudinary.js"

const videoUpload = Asyncerror(async(req,res)=>{ 
    const {title,description} = req.body 
    if(!title || !description){
        throw new Apierror(400,'All field are required')
    }
    
    const videofile = req.files?.videofile?.[0]?.path 
    const thumbnail = req.files?.thumbnail?.[0]?.path
   
    if(!videofile || !thumbnail) throw new Apierror(400,'Videofile or thumbnail do not found') 
    
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


const updateVideo =Asyncerror(async(req,res)=>{  
    const {videoId} = req.params  
    if(!videoId) throw new Apierror(400,'VideoId not found')
    
    const videoDetail = await findOwnerVideoDetails(videoId) 
    if(!videoDetail) throw new Apierror(400,'Owner Detail not found')
    
    if(req.user._id.toString()!==videoDetail.owner._id.toString()) {
        throw new Apierror(403,'User not authorized to update video details')
    }

    const {title, description} =req.body 
    const newthumbnailpath = req.file?.path 
    
    if(title === undefined && description === undefined && !newthumbnailpath){
        throw new Apierror(400,'At least one field is required')
    }

    const oldThumbnailurl = videoDetail?.thumbnail
   
    let newthumbnailurl
    if(newthumbnailpath){
       const updatethumbnailurl = await uploadonCloudinary(newthumbnailpath)
       if(!updatethumbnailurl) throw new Apierror(400,'Thumb nail not uploaded on cloudinary')
        newthumbnailurl= updatethumbnailurl?.url
    } 

    //update video details 
    const updateVideo = await updateVideoDetails(videoId,title,description,newthumbnailurl) 
    if(!updateVideo) throw new Apierror(400,'Video not updated')

    if(newthumbnailurl && oldThumbnailurl){
        await deleteFromCloudinary(oldThumbnailurl)
    }

    return res.status(200)
    .json(
        new Apiresponse(200,updateVideo,'Thumb nail updated')
    )
})

//for user to get all the videos.
const getAllVideos= Asyncerror(async(req,res)=>{
  const {page=1,limit=10,query,sortBy,sortType,userId} = req.query 

  const getVideo = await allvideoByOwnerId(userId)
  if(getVideo.length===0) throw new Apierror(400,'Cannot fetch the videos')

  let video = getVideo
  if(query){
     video = video.filter(video=>
        video.title.toLowerCase().includes(query.toLowerCase())
     )
  }
 
  //sort
 if(sortBy){
    video.sort((a,b)=>{
        if(sortType==='desc'){
            return a[sortBy] < b[sortBy] ? 1 : -1 
        } 
        return a[sortBy] > b[sortBy] ? 1: -1 
    })
 }

 //pagination 
   const skip = (page-1)*limit 
   video = video.slice(skip,skip + Number(limit))

  return res.status(200)
  .json(
    new Apiresponse(200,video,'Video fetched successfully')
  )
})

const getVideoById= Asyncerror(async(req,res)=>{
    const {videoId} = req.params
    if(!videoId) throw new Apierror(400,'Video id not found')

    const videoDetails = await findVideoById(videoId)
    if(!videoDetails) throw new Apierror(400,'VideoDetails not found')

    return res.status(200)
    .json(
        new Apiresponse(200,videoDetails,'Specific Video fetched successfully')
    )
})


export {videoUpload,updateVideo,getAllVideos,getVideoById}