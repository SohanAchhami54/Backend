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

const allvideoByOwnerId=async(page,limit,query,sortBy,sortType,userId)=>{
  const filter = {} 
  if(userId){
    filter.owner = userId
  }

  if(query){
    filter.title = { $regex:query , $options: 'i'} 
  }

  const skip = (Number(page)-1)* Number(limit) 

  return Video.find(filter)
  .sort({[sortBy]:sortType==='desc'?-1:1})
  .skip(Number(skip))
  .limit(Number(limit)) 
  .populate('owner')
}


const findVideoById = async(videoId)=>{
  return  Video.findById(videoId).populate('owner')
}

const deleteVideoById= async(videoId)=>{
   return Video.findByIdAndDelete(videoId)
}

const toggleStatus=async(videoId)=>{
  const video = await Video.findById(videoId) 
  if(!video) return null 

  video.isPublished= !video.isPublished 
  return await video.save()
}

export {createVideo,findOwnerVideoDetails,updateVideoDetails,allvideoByOwnerId,findVideoById,deleteVideoById,toggleStatus}