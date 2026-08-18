import { Video } from "../models/video.model.js"

const createVideo = async(videofileonCloudinary,thumbnailonCloudinary,owner,title,description)=>{
  return await Video.create({
     videofile:videofileonCloudinary?.url, 
      thumbnail:thumbnailonCloudinary?.url || '' , 
      owner, 
      title, 
      description,
      duration:videofileonCloudinary?.duration
  })
}

const findOwnerVideoDetails= async(videoid)=>{
   return Video.findById(videoid).populate('owner')
}

const updateVideoDetails=async(videoId,title,description,newthumbnailurl)=>{
   const updateData={} 
   if(title!==undefined){
     updateData.title=title
   }
   if(description!==undefined){
     updateData.description=title
   }

   if(newthumbnailurl!==undefined){
      updateData.thumbnail=newthumbnailurl
   }

  return Video.findByIdAndUpdate(videoId, {
    $set:updateData    
  },
  {returnDocument:'after'}
)
}

const allvideoByOwnerId=async(ownerid)=>{
  return Video.find({owner:ownerid})
}

const findVideoById = async(videoId)=>{
  return  Video.findById(videoId).populate('owner')
}

export {createVideo,findOwnerVideoDetails,updateVideoDetails,allvideoByOwnerId,findVideoById}