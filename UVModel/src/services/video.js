import { Video } from "../models/video.model.js"

const createVideo = async(videofileonCloudinary,thumbnailonCloudinary,owner,title,description)=>{
  return await Video.create({
     videofile:videofileonCloudinary?.url, 
      thumbnail:thumbnailonCloudinary?.url, 
      owner, 
      title, 
      description,
      duration:videofileonCloudinary?.duration
  })
}

const findOwnerVideoDetails= async(videoid)=>{
   return Video.findById(videoid)
}

const updateVideoThumbnail=async(userid,thumnnailurl)=>{
  return Video.findByIdAndUpdate(userid, {
    $set:{thumbnail:thumnnailurl},     
  },
  {returnDocument:'after'}
)
}

export {createVideo,findOwnerVideoDetails,updateVideoThumbnail}