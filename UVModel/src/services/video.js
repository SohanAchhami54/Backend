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
export {createVideo}