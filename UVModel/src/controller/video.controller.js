import { createVideo, findOwnerVideoDetails, updateVideoThumbnail, videoByOwnerId } from "../services/video.js"
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { Asyncerror } from "../utils/Asyncerror.js"
import { deleteFromCloudinary, uploadonCloudinary, uploadVideoonCloudinary } from "../utils/cloudinary.js"
import fs from 'fs'
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


const updateThumbnail =Asyncerror(async(req,res)=>{ 
    const newthumbnailpath = req.file?.path 
    if(!newthumbnailpath) throw new Apierror(400,'Thumb nail path is not defined') 

    // const oldThumbnailurl = await  findUserId(req.user._id) 
    const videoDetail = await findOwnerVideoDetails(req.params.videoId) 
    if(!videoDetail) throw new Apierror(400,'Owner Detail not found') 
    const oldThumbnailurl = videoDetail?.thumbnail

    const newthumbnailurl = await uploadonCloudinary(newthumbnailpath) 
    if(!newthumbnailurl) throw new Apierror(400,'Thumb nail not uploaded on cloudinary') 
    
    const updatenewurl = await updateVideoThumbnail(req.params.videoId,newthumbnailurl.url) 
    if(!updatenewurl) throw new Apierror(400,'Image not updated on database')

    if(oldThumbnailurl){
        await deleteFromCloudinary(oldThumbnailurl)
    }

    return res.status(200)
    .json(
        new Apiresponse(200,updatenewurl,'Thumb nail updated')
    )
})

//for user to get all the videos.
const getAllVideos= Asyncerror(async(req,res)=>{
  const {page=1,limit=10,query,sortBy,sortType,userId} = req.query 

  const getVideo = await videoByOwnerId(userId)
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

export {videoUpload,updateThumbnail,getAllVideos}