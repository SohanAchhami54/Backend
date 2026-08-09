import dotenv from 'dotenv' 
dotenv.config()
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadonCloudinary=async(filepath)=>{
    try {
        if (!filepath) return null 
        const response=await cloudinary.uploader.upload(filepath,{
        resource_type:'auto'
    }) 
    // console.log('Url of the image is:',response.url) 
    if(fs.existsSync(filepath)){
         fs.unlinkSync(filepath)
    }
    return response

    } catch (error) {
        console.log('Cloudinary error:',error) 
        if(fs.existsSync(filepath)){
            fs.unlinkSync(filepath) 
        }
        return null
    }
} 

const deleteFromCloudinary = async (imageUrl) => {
    if (!imageUrl) return null
    try {
        const publicId = imageUrl
            .split('/upload/')[1]
            .replace(/^v\d+\//, '')
            .replace(/\.[^/.]+$/, '')

         await cloudinary.uploader.destroy(publicId)

    } catch (error) {
        return null
    }
}
export {uploadonCloudinary,deleteFromCloudinary}
